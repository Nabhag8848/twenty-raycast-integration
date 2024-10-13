import { Icon, MenuBarExtra, open, openExtensionPreferences } from "@raycast/api";
import { useEffect, useState } from "react";

import { UnResolvedReports } from "./types/api";
import { Api, MenuBarIcon, Shortcuts } from "./enum/api";

import { MenuBarItem } from "./components";

function UnresolvedReports() {
  const [reports, setReports] = useState<UnResolvedReports | undefined>();
  const isLoading = reports === undefined;
  const InReports = reports && reports.investigating.length > 0;
  const IdReports = reports && reports.identified.length > 0;
  const MoReports = reports && reports.monitoring.length > 0;

  useEffect(
    function () {
      async function onLoad() {
        setReports({
          identified: [],
          investigating: [],
          monitoring: [],
        });
      }
      if (reports) return;
      onLoad();
    },
    [reports],
  );

  return (
    <MenuBarExtra icon={MenuBarIcon} tooltip="Unresolved Status Reports" isLoading={isLoading}>
      <MenuBarExtra.Section title="Status Reports">
        <MenuBarExtra.Submenu title="Investigating" icon={Icon.MagnifyingGlass}>
          {InReports && <MenuBarItem reports={reports.investigating} />}
        </MenuBarExtra.Submenu>

        <MenuBarExtra.Submenu title="Identified" icon={Icon.Fingerprint}>
          {IdReports && <MenuBarItem reports={reports.identified} />}
        </MenuBarExtra.Submenu>

        <MenuBarExtra.Submenu title="Monitoring" icon={Icon.Heartbeat}>
          {MoReports && <MenuBarItem reports={reports.monitoring} />}
        </MenuBarExtra.Submenu>
      </MenuBarExtra.Section>
      <MenuBarExtra.Section title="Support and Utilities">
        <MenuBarExtra.Item
          title="Setup Instruction"
          icon={Icon.WrenchScrewdriver}
          shortcut={Shortcuts.guide}
          onAction={() => open(Api.USER_GUIDE)}
        />
        <MenuBarExtra.Item
          title="Preferences"
          icon={Icon.Keyboard}
          shortcut={Shortcuts.preferences}
          onAction={async () => await openExtensionPreferences()}
        />
      </MenuBarExtra.Section>
    </MenuBarExtra>
  );
}

export default UnresolvedReports;
