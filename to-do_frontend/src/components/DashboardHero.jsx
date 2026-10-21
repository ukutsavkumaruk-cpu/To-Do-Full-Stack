function DashboardHero({ taskCount, pendingCount, completedCount }) {
    return (
        <section className="dashboard-hero" aria-labelledby="hero-title">
            <div className="hero-copy">
                <span className="hero-eyebrow">A LITTLE MORE FOCUS, EVERY DAY</span>
                <h2 id="hero-title">Make space for<br />what matters.</h2>
                <p>Small steps add up. Keep your day moving, one task at a time.</p>
            </div>
            <div className="hero-stats" aria-label="Task summary">
                <div className="hero-stat">
                    <span className="stat-value">{taskCount}</span>
                    <span className="stat-label">All tasks</span>
                </div>
                <div className="hero-stat">
                    <span className="stat-value">{pendingCount}</span>
                    <span className="stat-label">To do</span>
                </div>
                <div className="hero-stat">
                    <span className="stat-value">{completedCount}</span>
                    <span className="stat-label">Done</span>
                </div>
            </div>
            <span className="hero-orb hero-orb-one" />
            <span className="hero-orb hero-orb-two" />
        </section>
    );
}

export default DashboardHero;
