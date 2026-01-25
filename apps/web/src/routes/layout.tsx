import { component$, Slot } from "@builder.io/qwik";
import { DashboardLayout } from "~/components/layouts/DashboardLayout";

export default component$(() => {
  return (
    <DashboardLayout>
      <Slot />
    </DashboardLayout>
  );
});
