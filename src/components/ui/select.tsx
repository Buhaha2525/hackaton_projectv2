"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";

function Select(props: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root {...props} />;
}

function SelectGroup(props: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group {...props} />;
}

function SelectValue(props: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value {...props} />;
}

interface SelectTriggerProps extends React.ComponentProps<typeof SelectPrimitive.Trigger> {
  size?: "sm" | "default";
}

function SelectTrigger({ className = "", size = "default", children, ...props }: SelectTriggerProps) {
  const baseStyles = "flex w-full items-center justify-between gap-2 rounded-md border px-3 py-2 text-sm transition-all outline-none disabled:cursor-not-allowed disabled:opacity-50";
  const sizeStyles = size === "sm" ? "h-8" : "h-9";
  const combinedClassName = `${baseStyles} ${sizeStyles} ${className}`;
  
  return (
    <SelectPrimitive.Trigger className={combinedClassName} {...props}>
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className="h-4 w-4 opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

function SelectContent({ className = "", children, position = "popper", ...props }: React.ComponentProps<typeof SelectPrimitive.Content>) {
  const baseStyles = "relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md";
  const combinedClassName = `${baseStyles} ${className}`;
  
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content className={combinedClassName} position={position} {...props}>
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport className="p-1">
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

function SelectLabel({ className = "", ...props }: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return <SelectPrimitive.Label className={`px-2 py-1.5 text-xs text-muted-foreground ${className}`} {...props} />;
}

function SelectItem({ className = "", children, ...props }: React.ComponentProps<typeof SelectPrimitive.Item>) {
  const baseStyles = "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50";
  
  return (
    <SelectPrimitive.Item className={`${baseStyles} ${className}`} {...props}>
      <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="h-4 w-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

function SelectSeparator({ className = "", ...props }: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return <SelectPrimitive.Separator className={`-mx-1 my-1 h-px bg-border ${className}`} {...props} />;
}

function SelectScrollUpButton({ className = "", ...props }: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton className={`flex cursor-default items-center justify-center py-1 ${className}`} {...props}>
      <ChevronUpIcon className="h-4 w-4" />
    </SelectPrimitive.ScrollUpButton>
  );
}

function SelectScrollDownButton({ className = "", ...props }: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton className={`flex cursor-default items-center justify-center py-1 ${className}`} {...props}>
      <ChevronDownIcon className="h-4 w-4" />
    </SelectPrimitive.ScrollDownButton>
  );
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
