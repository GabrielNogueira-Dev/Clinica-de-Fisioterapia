import Agendamento from "@/components/agendamento";
import MarcacaoPilatesLayout from "@/components/agendamentos/pilates";
import AreaDoPaciente from "@/components/areadopaciente";
import Inicio from "@/components/inicio";

export default function Home() {
  return (
    <div>
      <main>
        <Inicio/>
        <AreaDoPaciente/>
        <Agendamento/>
        <MarcacaoPilatesLayout/>
      </main>
    </div>
  );
}
