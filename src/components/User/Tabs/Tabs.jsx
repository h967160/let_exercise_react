import styles from "./Tabs.module.scss";

const Tabs = ({ activeTab, handleTabChange }) => {
  const tabs = [
    { id: "followers", text: "我的粉絲" },
    { id: "following", text: "我的追蹤" },
    { id: "created-activities", text: "我的開團" },
    { id: "joined-activities", text: "我的報名" },
  ];

  const Tab = ({ tabId, tabText }) => (
    <div
      className={`${styles.tab} ${activeTab === tabId ? styles.active : ""}`}
      id={tabId}
      onClick={() => handleTabChange(tabId)}
    >
      {tabText}
    </div>
  );

  return (
    <section className={styles.tabs}>
      <div className={styles.tabWrapper}>
        {tabs.map((tab) => (
          <Tab key={tab.id} tabId={tab.id} tabText={tab.text} />
        ))}
      </div>
    </section>
  );
};

export default Tabs;
