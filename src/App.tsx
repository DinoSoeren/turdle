import {
  InformationCircleIcon,
  ChartBarIcon,
  SunIcon,
  EyeIcon,
  EyeOffIcon,
} from '@heroicons/react/outline'
import { FaDiscord } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import { Alert } from './components/alerts/Alert'
import { Grid } from './components/grid/Grid'
import { Keyboard } from './components/keyboard/Keyboard'
import { AboutModal } from './components/modals/AboutModal'
import { InfoModal } from './components/modals/InfoModal'
import { StatsModal } from './components/modals/StatsModal'
import {
  WIN_MESSAGES,
  GAME_COPIED_MESSAGE,
  ABOUT_GAME_MESSAGE,
  NOT_ENOUGH_LETTERS_MESSAGE,
  WORD_NOT_FOUND_MESSAGE,
  CORRECT_WORD_MESSAGE,
} from './constants/strings'
import { isWordInWordList, isWinningWord, solution } from './lib/words'
import { addStatsForCompletedGame, loadStats } from './lib/stats'
import {
  loadGameStateFromLocalStorage,
  saveGameStateToLocalStorage,
  loadSettingsFromLocalStorage,
  saveSettingsToLocalStorage,
} from './lib/localStorage'

import './App.css'
import { wordleToTurdle } from './constants/validGuesses'

const ALERT_TIME_MS = 2000

function App() {
  const prefersDarkMode = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches

  const [currentGuess, setCurrentGuess] = useState('')
  const [isGameWon, setIsGameWon] = useState(false)
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false)
  const [isNotEnoughLetters, setIsNotEnoughLetters] = useState(false)
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false)
  const [isWordNotFoundAlertOpen, setIsWordNotFoundAlertOpen] = useState(false)
  const [isGameLost, setIsGameLost] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('theme')
      ? localStorage.getItem('theme') === 'dark'
      : prefersDarkMode
      ? true
      : false
  )
  const [isFirstTimePlaying, setIsFirstTimePlaying] = useState<boolean>(() => {
    const loaded = loadSettingsFromLocalStorage()
    if (loaded?.isFirstTimePlaying === false) {
      return false
    }
    return true
  })
  const [isExtraVisionModeEnabled, setExtraVisionModeEnabled] =
    useState<boolean>(() => {
      const loaded = loadSettingsFromLocalStorage()
      if (loaded?.isExtraVisionModeEnabled === true) {
        return true
      }
      return false
    })
  const [successAlert, setSuccessAlert] = useState('')
  const [guesses, setGuesses] = useState<string[]>(() => {
    const loaded = loadGameStateFromLocalStorage()
    if (loaded?.solution !== solution) {
      return []
    }
    const gameWasWon = loaded.guesses.includes(solution)
    if (gameWasWon) {
      setIsGameWon(true)
    }
    if (loaded.guesses.length === 6 && !gameWasWon) {
      setIsGameLost(true)
    }
    return loaded.guesses
  })

  const [stats, setStats] = useState(() => loadStats())

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  const handleDarkMode = (isDark: boolean) => {
    setIsDarkMode(isDark)
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }

  useEffect(() => {
    saveGameStateToLocalStorage({ guesses, solution })
  }, [guesses])

  useEffect(() => {
    if (isGameWon) {
      setSuccessAlert(
        WIN_MESSAGES[Math.floor(Math.random() * WIN_MESSAGES.length)]
      )
      setTimeout(() => {
        setSuccessAlert('')
        setIsStatsModalOpen(true)
      }, ALERT_TIME_MS)
    }
    if (isGameLost) {
      setTimeout(() => {
        setIsStatsModalOpen(true)
      }, ALERT_TIME_MS)
    }
  }, [isGameWon, isGameLost])

  useEffect(() => {
    saveSettingsToLocalStorage({
      isFirstTimePlaying,
      isExtraVisionModeEnabled,
    })
    if (isFirstTimePlaying) {
      setIsInfoModalOpen(true)
      setIsFirstTimePlaying(false)
    }
  }, [isFirstTimePlaying, isExtraVisionModeEnabled])

  const onChar = (value: string, replace: boolean) => {
    if (currentGuess.length < 5 && guesses.length < 6 && !isGameWon) {
      if (replace) {
        setCurrentGuess(
          `${currentGuess.substring(0, currentGuess.length - 1)}${value}`
        )
      } else {
        setCurrentGuess(`${currentGuess}${value}`)
      }
    }
  }

  const onDelete = () => {
    setCurrentGuess(currentGuess.slice(0, -1))
  }

  const onEnter = () => {
    if (isGameWon || isGameLost) {
      return
    }
    if (!(currentGuess.length === 5)) {
      setIsNotEnoughLetters(true)
      return setTimeout(() => {
        setIsNotEnoughLetters(false)
      }, ALERT_TIME_MS)
    }

    if (!isWordInWordList(currentGuess)) {
      setIsWordNotFoundAlertOpen(true)
      return setTimeout(() => {
        setIsWordNotFoundAlertOpen(false)
      }, ALERT_TIME_MS)
    }

    const winningWord = isWinningWord(currentGuess)

    if (currentGuess.length === 5 && guesses.length < 6 && !isGameWon) {
      setGuesses([...guesses, currentGuess])
      setCurrentGuess('')

      if (winningWord) {
        setStats(addStatsForCompletedGame(stats, guesses.length))
        return setIsGameWon(true)
      }

      if (guesses.length === 5) {
        setStats(addStatsForCompletedGame(stats, guesses.length + 1))
        setIsGameLost(true)
      }
    }
  }

  return (
    <div className="py-8 max-w-7xl mx-auto sm:px-6 lg:px-8">
      <div className="flex w-80 mx-auto items-center mb-8 mt-12">
        <div className="flex grow">
          <h1 className="text-xl flex font-bold dark:text-white">Turdle</h1>
          <div className="logo flex shrink-0 grow-0 ml-1 w-7 h-7"></div>
        </div>
        {!isExtraVisionModeEnabled ? (
          <EyeIcon
            className="h-6 w-6 cursor-pointer dark:stroke-white hover:opacity-50 transition-opacity"
            onClick={() => setExtraVisionModeEnabled(!isExtraVisionModeEnabled)}
          />
        ) : (
          <EyeOffIcon
            className="h-6 w-6 cursor-pointer dark:stroke-white hover:opacity-50 transition-opacity"
            onClick={() => setExtraVisionModeEnabled(!isExtraVisionModeEnabled)}
          />
        )}
        <SunIcon
          className="h-6 w-6 cursor-pointer dark:stroke-white hover:opacity-50 transition-opacity"
          onClick={() => handleDarkMode(!isDarkMode)}
        />
        <InformationCircleIcon
          className="h-6 w-6 cursor-pointer dark:stroke-white hover:opacity-50 transition-opacity"
          onClick={() => setIsInfoModalOpen(true)}
        />
        <ChartBarIcon
          className="h-6 w-6 cursor-pointer dark:stroke-white hover:opacity-50 transition-opacity"
          onClick={() => setIsStatsModalOpen(true)}
        />
      </div>
      <Grid
        guesses={guesses}
        currentGuess={currentGuess}
        extraVision={
          isExtraVisionModeEnabled ||
          isGameLost ||
          isInfoModalOpen ||
          isAboutModalOpen ||
          isStatsModalOpen
        }
      />
      <Keyboard
        onChar={onChar}
        onDelete={onDelete}
        onEnter={onEnter}
        guesses={guesses}
        currentGuess={currentGuess.split('')}
        extraVision={
          isExtraVisionModeEnabled ||
          isGameLost ||
          isInfoModalOpen ||
          isAboutModalOpen ||
          isStatsModalOpen
        }
      />
      <InfoModal
        isOpen={isInfoModalOpen}
        handleClose={() => setIsInfoModalOpen(false)}
        extraVision={isExtraVisionModeEnabled}
      />
      <StatsModal
        isOpen={isStatsModalOpen}
        handleClose={() => setIsStatsModalOpen(false)}
        guesses={guesses}
        gameStats={stats}
        isGameLost={isGameLost}
        isGameWon={isGameWon}
        handleShare={() => {
          setSuccessAlert(GAME_COPIED_MESSAGE)
          return setTimeout(() => setSuccessAlert(''), ALERT_TIME_MS)
        }}
      />
      <AboutModal
        isOpen={isAboutModalOpen}
        handleClose={() => setIsAboutModalOpen(false)}
      />

      <div className="flex justify-center gap-1 mt-8">
        <button
          type="button"
          className="flex shrink grow-0 items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 select-none"
          onClick={() => setIsAboutModalOpen(true)}
        >
          {ABOUT_GAME_MESSAGE}
        </button>
        <a
          type="button"
          className="flex shrink-0 grow-0 items-center px-2.5 py-1.5 border border-transparent text-s font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 select-none"
          href="https://discord.gg/ryjr3TbZGm"
        >
          <FaDiscord className="mx-auto" />
        </a>
      </div>

      <Alert message={NOT_ENOUGH_LETTERS_MESSAGE} isOpen={isNotEnoughLetters} />
      <Alert
        message={WORD_NOT_FOUND_MESSAGE}
        isOpen={isWordNotFoundAlertOpen}
      />
      <Alert
        message={CORRECT_WORD_MESSAGE(wordleToTurdle(solution))}
        isOpen={isGameLost}
      />
      <Alert
        message={successAlert}
        isOpen={successAlert !== ''}
        variant="success"
      />
    </div>
  )
}

export default App
