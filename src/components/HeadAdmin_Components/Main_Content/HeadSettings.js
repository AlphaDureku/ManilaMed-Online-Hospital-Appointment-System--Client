import { Divider } from "@mantine/core";

export default function HeadSettings() {
  return (
    <>
      <div className="head-settingspage">
        <div className="quickinfo-row">
          <div className="icon-col">
            <img
              src="/images/icon1.png"
              className="img-fluid img-none"
              alt="Icon"
            />
          </div>
          <div className="name-col">
            <p>Admin name</p>
            <p>Admin</p>
          </div>
        </div>
        <Divider size="md" style={{ marginLeft: "3%", marginRight: "3%" }} />
        <div className="manageprofile-options">
          <div className="options-tagtitle">General</div>
          <div className="options-row">
            <p>Manage Profile</p>
            <p>Change your personal information</p>
            <Divider size="md" />
          </div>
          <div className="options-row mt-3">
            <p>Security</p>
            <p>Change your password</p>
          </div>
        </div>
      </div>
    </>
  );
}
