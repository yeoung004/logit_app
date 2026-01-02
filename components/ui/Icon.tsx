import { Bell, LucideProps } from "lucide-react-native";

// 사용할 아이콘들을 객체로 매핑
const ICON_SET = { bell: Bell } as const;

export type IconName = keyof typeof ICON_SET;

interface IconProps extends LucideProps {
  name: IconName;
}

const Icon = ({ name, color, size, ...props }: IconProps) => {
  const LucideIcon = ICON_SET[name];

  return <LucideIcon fill={color} strokeWidth={2} color={color} size={size} {...props} />;
};

export default Icon;