import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import ActiveLoans from "@/components/loans/ActiveLoans";
import ReservedList from "@/components/loans/ReservedList";
import HistoryList from "@/components/loans/HistoryList";

export default function LoansPage() {
  const [tab, setTab] = useState<"active" | "reserved" | "history">("active");

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {/* TABS */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginBottom: 20,
        }}
      >
        <TouchableOpacity onPress={() => setTab("active")}>
          <Text style={{ fontWeight: tab === "active" ? "900" : "400" }}>
            Ativos
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setTab("reserved")}>
          <Text style={{ fontWeight: tab === "reserved" ? "900" : "400" }}>
            Reservas
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setTab("history")}>
          <Text style={{ fontWeight: tab === "history" ? "900" : "400" }}>
            Histórico
          </Text>
        </TouchableOpacity>
      </View>

      {/* CONTENT */}
      {tab === "active" && <ActiveLoans />}
      {tab === "reserved" && <ReservedList />}
      {tab === "history" && <HistoryList />}
    </View>
  );
}
