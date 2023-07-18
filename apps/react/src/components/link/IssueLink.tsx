import { FC, ReactNode } from "react";
import { Anchor, AnchorProps } from "@mantine/core";
import { useAppEnvs } from "../../api/hooks";

type Props = AnchorProps & {
  issueId: string;
  children: ReactNode;
};

export const IssueLink: FC<Props> = ({ issueId, children, ...anchorProps }) => {
  const { data: appEnvs } = useAppEnvs();

  return (
    <Anchor
      href={appEnvs ? `${appEnvs.body.jiraUrlPrefix}/${issueId}` : undefined}
      target="_blank"
      rel="noopener noreferrer"
      sx={{ width: "fit-content" }}
      {...anchorProps}
    >
      {children}
    </Anchor>
  );
};
