import { Suspense } from 'react';
import SimulateClient from './simulate';

export default function SimulatePage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <SimulateClient />
    </Suspense>
  );
}