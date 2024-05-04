import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Globe } from "lucide-react";
import { useTranslation } from "react-i18next";

const LanguageSelector = () => {
  const { t, i18n } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        id="language-selector"
        className={cn({
          ["h-10 p-2 md:p-4 flex gap-2 items-center justify-center hover:bg-background rounded-lg transition-colors duration-300 "]:
            true,
        })}
      >
        <Globe size={20} strokeWidth={1.5} />
        {i18n.language}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-24 mr-5 ">
        <DropdownMenuItem
          id="language-en"
          onClick={() => {
            i18n.changeLanguage("en");
          }}
          className="flex items-center justify-center gap-2"
        >
          {t("En")} <p className="text-sm text-zinc-500">(English)</p>
        </DropdownMenuItem>
        <DropdownMenuItem
          id="language-es"
          onClick={() => {
            i18n.changeLanguage("es");
          }}
          className="flex items-center justify-center gap-2"
        >
          {t("Es")}
          <p className="text-sm text-zinc-500">(Español)</p>
        </DropdownMenuItem>
        <DropdownMenuItem
          id="language-no"
          onClick={() => {
            i18n.changeLanguage("no");
          }}
          className="flex items-center justify-center gap-2"
        >
          {t("No")}
          <p className="text-sm text-zinc-500">(Norsk)</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
