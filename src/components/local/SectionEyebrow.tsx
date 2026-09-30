import { LucideIcon } from "lucide-react";

interface SectionEyebrowProps {
  icon: LucideIcon;
  label: string;
}

const SectionEyebrow = ({ icon: Icon, label }: SectionEyebrowProps) => (
  <div className="section-eyebrow">
    <Icon className="w-4 h-4 mr-2" />
    {label}
  </div>
);

export default SectionEyebrow;
