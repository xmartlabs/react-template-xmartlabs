export type ContainerProps = React.HTMLProps<HTMLDivElement> & {
  className?: string;
};

export const Container: React.FC<ContainerProps> = ({
  children = null,
  className = "",
  ...props
}) => (
  <div
    className={`w-full sm:w-[40rem] md:w-[48rem] lg:w-[64rem] xl:w-[80rem] 2xl:w-[96rem] mx-auto px-4 ${className}`}
    {...props}
  >
    {children}
  </div>
);
