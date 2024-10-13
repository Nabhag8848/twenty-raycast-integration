import { LaunchType, MenuBarExtra, launchCommand } from "@raycast/api";
import { Fragment } from "react";

import { StatusIcons } from "../enum/tag";
import { NonResolvedReports } from "../types/api";
import { getTimeAgoFromISO } from "../helper";

export default function MenuBarItem({ reports }: { reports: Array<NonResolvedReports> }) {
  async function openUpdateStatusReportForm(id: number) {
    await launchCommand({
      name: "update-status-report",
      type: LaunchType.UserInitiated,
      context: {
        type: "update_report_menu_bar",
        payload: {
          report: {},
          allMonitors: [],
          allPages: [],
        },
      },
    });
  }

  return (
    <Fragment>
      {reports.map((report) => {
        const { status, title, id, date } = report;

        return (
          <MenuBarExtra.Item
            title={title}
            key={id}
            icon={StatusIcons[status]}
            onAction={() => openUpdateStatusReportForm(id)}
            subtitle={getTimeAgoFromISO(date, true)}
            tooltip={title}
          />
        );
      })}
    </Fragment>
  );
}
