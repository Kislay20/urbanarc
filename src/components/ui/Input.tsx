import { InputHTMLAttributes } from "react";
import clsx from "clsx";


export default function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={clsx(
        "w-full rounded-md border border-border bg-bg px-3 py-2 text-sm text-white placeholder:text-muted focus:border-primary focus:outline-none",
        props.className
      )}
    />
  );
}
