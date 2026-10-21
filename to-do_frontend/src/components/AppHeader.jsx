import AppName from "./AppName";

function AppHeader() {
    return (
        <header className="app-header">
            <AppName />
            <div className="workspace-label">
                <span className="workspace-indicator" />
                Your personal workspace
            </div>
        </header>
    );
}

export default AppHeader;
