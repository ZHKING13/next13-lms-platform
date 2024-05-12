import React, { useEffect, useState } from "react";
import SectionHeader from "../SectionHeader";
import Container from "../Container";
import useStore from "@/store/useStore";
import PlanCard from "../PlanCard";
import Filter from "../Filter";
import { plans } from "@/datas";
import toast from "react-hot-toast";
import axios from "axios";
import { generateShortOrderId } from "@/lib/format";
import { useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
export default function Plan() {
  const { plan, setPlan, isToggled, step, increaseStep, decreaseStep, personalInfo } =
    useStore((state) => state);
  const [selectedPlan, setSelectedPlan] = useState(plan);
   const user = useAuth();
   console.log(user);
   if (!user.isSignedIn) {
       redirect("/dashboard");
   }
 async function onSubmit() {
     try {
        //  console.log(JSON.stringify(data));
         const UserData = {
             userId: user.userId,
             ...personalInfo,
             pack: plan.name,
             frequence:plan.type,
         };
         console.log(UserData);

         const paymentData = await axios.post("api/cashout", {
             currency: "XOF",
             order_id: generateShortOrderId(),
             amount: 10,
             return_url: "https://cobaltinvestltd.com/dashboard/search",
             cancel_url: "https://cobaltinvestltd.com/",
             reference: "cobalt_invest",
             state: encodeURIComponent(JSON.stringify(UserData)),
             ...UserData,
             userId: user.userId,
             // Autres paramètres comme nécessaire
         });

         if (!paymentData.data.url) {
             throw new Error(`No payment URL found in the response.`);
         }

         console.log(paymentData.data);
         // Redirection vers la page de paiement
         window.location.href = paymentData.data.url;
     } catch (error) {
         toast.error(
             "Une erreur s'est produite lors de la soumission du formulaire."
         );
         console.error(
             "Une erreur s'est produite lors de la soumission du formulaire :",
             error
         );
     }
 }

  useEffect(() => {
    setPlan({
      ...plan,
      ...selectedPlan,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPlan]);

  const onNext = () => {
    if (!selectedPlan?.id || !plan.name) {
       toast.error(
           "Veuillez selectionner un pack"
       );
       return
    }
    // onSubmit()
    increaseStep(step);
    
  };

  const onPrevious = () => {
    decreaseStep(step);
  };

  const handleOnClick = (plan: any) => {
    setSelectedPlan({
      ...selectedPlan,
      id: plan.id,
      name: plan.name,
      price: isToggled
        ? plan.subscription.yearly.price
        : plan.subscription.monthly.price,
      type: isToggled
        ? plan.subscription.yearly.type
        : plan.subscription.monthly.type,
    });
  };

  return (
    <Container onNext={onNext} onPreviousStep={onPrevious}>
      <div>
        <SectionHeader
          title="Choisis ton pack"
          description="Vous avez le choix entre un abonnement mensuel ou annuel."
        />
        <section className="flex flex-col gap-3 lg:flex-row lg:gap-4 w-full">
          {plans.map((plan) => (
            <PlanCard
              key={plan.id}
              onClick={() => handleOnClick(plan)}
              item={plan}
            />
          ))}
        </section>
        <Filter />
      </div>
    </Container>
  );
}