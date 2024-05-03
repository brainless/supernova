import { Component, For, createMemo } from "solid-js";
import { useWorkspace } from "../../stores/workspace";
import { APIDataSource } from "../../api_types/APIDataSource";
import { useUserInterface } from "../../stores/userInterface";
import { useNavigate } from "@solidjs/router";
import { APIFolderSource } from "../../api_types/APIFolderSource";

const DatabaseSourceItem: Component<APIDataSource> = (props) => {
  const [_, { getColors }] = useUserInterface();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/settings/database-source/edit/${props.id}`);
  };

  return (
    <div
      class="p-4 text-white rounded-md border cursor-pointer"
      style={{
        "background-color": getColors().colors["panel.background"],
        "border-color": getColors().colors["panel.border"],
      }}
      onClick={handleClick}
    >
      <i class="fa-solid fa-database w-6 text-gray-500" />
      {props.label || props.sourceName}
      <div>
        <span class="text-xs bg-gray-500 text-gray-900 rounded-sm px-2">
          {props.sourceType}
        </span>
      </div>
    </div>
  );
};

const FolderSourceItem: Component<APIFolderSource> = (props) => {
  const [_, { getColors }] = useUserInterface();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/settings/folder-source/edit/${props.id}`);
  };

  return (
    <div
      class="p-4 text-white rounded-md border cursor-pointer"
      style={{
        "background-color": getColors().colors["panel.background"],
        "border-color": getColors().colors["panel.border"],
      }}
      onClick={handleClick}
    >
      <i class="fa-solid fa-database w-6 text-gray-500" />
      {props.label || props.path}
      <div>
        <span class="text-xs bg-gray-500 text-gray-900 rounded-sm px-2">
          Folder
        </span>
      </div>
    </div>
  );
};

const SettingsSourceList: Component = () => {
  const [workspace] = useWorkspace();

  const databaseSources = createMemo(() => {
    if (!workspace.isFetching && !!workspace.isReady) {
      return workspace.dataSourceList;
    }
    return [];
  });

  const folderSources = createMemo(() => {
    if (!workspace.isFetching && !!workspace.isReady) {
      return workspace.folderList;
    }
    return [];
  });

  return (
    <>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-2">
        <For each={databaseSources()}>
          {(dataSource) => <DatabaseSourceItem {...dataSource} />}
        </For>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <For each={folderSources()}>
          {(folderSource) => <FolderSourceItem {...folderSource} />}
        </For>
      </div>
    </>
  );
};

export default SettingsSourceList;
