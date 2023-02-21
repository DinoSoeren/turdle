import { Dialog, Transition } from '@headlessui/react'
import { XCircleIcon } from '@heroicons/react/outline'
import classNames from 'classnames'
import { Fragment } from 'react'
import { IconType } from 'react-icons'

type Props = {
  title: string
  children: React.ReactNode
  extraButton?: IconType
  extraButtonDesc?: string
  isOpen: boolean
  handleClose: () => void
  handleExtraButtonClick?: () => void
}

export const BaseModal = ({
  title,
  children,
  extraButton,
  extraButtonDesc,
  isOpen,
  handleClose,
  handleExtraButtonClick,
}: Props) => {
  const modalButton = classNames(
    'h-6 w-6 cursor-pointer fill-gray-200 hover:fill-gray-500 dark:fill-gray-700 dark:hover:fill-gray-400'
  )
  const styledButton = extraButton
    ? extraButton({ className: modalButton })
    : undefined

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={handleClose}
      >
        <div className="flex min-h-full items-center justify-center py-10 px-4 text-center sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 min-h-screen bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all dark:bg-gray-800 sm:my-8 sm:w-full sm:max-w-sm sm:p-6 sm:align-middle">
              {!!styledButton && (
                <button
                  onClick={() => {
                    handleClose()
                    if (handleExtraButtonClick) handleExtraButtonClick()
                  }}
                  tabIndex={1}
                  aria-label={extraButtonDesc}
                  aria-pressed="false"
                  className="absolute left-4 top-4"
                >
                  {styledButton}
                </button>
              )}
              <button
                onClick={() => handleClose()}
                tabIndex={0}
                aria-label="Close"
                aria-pressed="false"
                className="absolute right-4 top-4"
              >
                <XCircleIcon className="h-6 w-6 cursor-pointer dark:stroke-white" />
              </button>
              <div>
                <div className="text-center">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100"
                  >
                    {title}
                  </Dialog.Title>
                  <div className="mt-2">{children}</div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
