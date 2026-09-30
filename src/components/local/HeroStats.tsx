import { useTranslation } from "react-i18next";

const HeroStats = () => {
  const { t } = useTranslation("home");

  const stats = [
    { value: t("stats.experience.value"), label: t("stats.experience.label") },
    { value: t("stats.families.value"), label: t("stats.families.label") },
    { value: t("stats.satisfaction.value"), label: t("stats.satisfaction.label") },
  ];

  return (
    <div className="grid grid-cols-3 gap-4 md:gap-8 pt-8 border-t border-border/40 mt-8">
      {stats.map((stat) => (
        <div key={stat.label} className="text-left">
          <div className="stat-value">{stat.value}</div>
          <p className="text-sm text-muted-foreground mt-2 leading-snug">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default HeroStats;
