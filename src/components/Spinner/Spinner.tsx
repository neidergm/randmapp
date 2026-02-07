import { LuLoader } from "react-icons/lu"
import style from './spinner.module.scss'
import { PropsWithChildren } from "react"

type SpinnerProps = PropsWithChildren<{
  size?: number,
  className?: string,
}>

const Spinner = ({
  size = 16,
  className,
  children
}: SpinnerProps) => {
  return (<div className={`${style.spinnerContainer} ${className}`}>
    <LuLoader size={size} className={style.spinning} />
    {children}
  </div>
  )
}

export default Spinner