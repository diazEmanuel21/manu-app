import type { Metadata } from "next";

import { AddressRoutingModule } from "@/presentation/address-routing/address-routing-module";

export const metadata: Metadata = {
  title: "Address Routing Module",
  description:
    "Interactive delivery routing module that orders addresses by proximity, priority and zone cohesion.",
};

export default function AddressRoutingPage() {
  return <AddressRoutingModule />;
}
