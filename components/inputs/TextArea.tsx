import { DetailedHTMLProps, FC, TextareaHTMLAttributes } from 'react'

interface ITextAreaProps
  extends DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {}

const TextArea: FC<ITextAreaProps> = ({ rows = 3, className, ...rest }) => {
  return (
    <textarea
      className={`bg-primary-2 text-primary-dark-1 placeholder-slate-600 w-full max-w-lg rounded-lg outline-primary-pink-1 px-8 py-4 ${className}`}
      rows={rows}
      {...rest}
    ></textarea>
  )
}

export default TextArea
