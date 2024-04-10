import { Component } from "solid-js";

interface IPropTypes {
  label: string;
  icon: string;
  href?: string;
  isActive?: boolean;
  infoTag?: string;
}

const SidebarHeading: Component<IPropTypes> = (props) => {
  const Tag = () =>
    !!props.infoTag ? (
      <div>
        <span class="text-xs bg-gray-500 text-gray-900 rounded-sm px-2">
          {props.infoTag}
        </span>
      </div>
    ) : null;

  if (!!props.href) {
    return (
      <a
        class={
          "mx-2 my-2 px-2 py-1 block select-none rounded-md hover:bg-zinc-700 " +
          (!!props.isActive ? "font-bold text-white" : "text-gray-400")
        }
        href={props.href}
      >
        <i class={`${props.icon} w-6 text-gray-500`} />
        {props.label}
        <Tag />
      </a>
    );
  } else {
    return (
      <div class="mx-2 my-2 px-2 py-1 select-none rounded-md">
        <i class={`${props.icon} w-6 text-gray-500`} />
        {props.label}
        <Tag />
      </div>
    );
  }
};

export default SidebarHeading;
