import { CvMaker } from "@/components/cv-maker";
import { Footer } from "@/components/ui/footer";
import { FormRefreshContextProvider } from "@/contexts/cvFormRefresh";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <FormRefreshContextProvider>
          <CvMaker />
        </FormRefreshContextProvider>
      </main>
      <Footer />
    </div>
  );
}
