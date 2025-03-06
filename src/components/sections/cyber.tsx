import { Globe } from "@/components/ui/FeaturesSectionDemo";
// import { Button } from "@/components/ui/button"; // Suppression de l'importation inutilisée
import { BoxReveal } from "@/components/magicui/box-reveal"; 
import { useTranslations } from 'next-intl'
 
export function GlobeDemo() {
  const t = useTranslations('security')
  return (
    <div className="flex flex-col container">
        <div className="flex-1 flex flex-row items-center justify-around">
              <div className="size-full max-w-lg items-center justify-center overflow-hidden pt-8">
      <BoxReveal boxColor={"#5046e6"} duration={0.5}>
        <p className="text-[3.5rem] font-semibold">
        {t('title')} <span className="text-[#5046e6]">.</span>
        </p>
      </BoxReveal>
 
      <BoxReveal boxColor={"#5046e6"} duration={0.5}>
        <h2 className="mt-[.5rem] text-[1rem]">
        {t('soustitre1')} {" "}
          <span className="text-[#5046e6]">{t('soustitre2')}</span>
        </h2>
      </BoxReveal>

      <BoxReveal boxColor={"#5046e6"} duration={0.5}>
        <div className="mt-6">
          <p>
            -&gt; {t('description1')} <br />
            -&gt; {t('description2')} <br />
          </p>
        </div>
      </BoxReveal>
    </div>
            <div className="flex items-center">
                <Globe />
            </div>
        </div>
    </div>
  );
}



