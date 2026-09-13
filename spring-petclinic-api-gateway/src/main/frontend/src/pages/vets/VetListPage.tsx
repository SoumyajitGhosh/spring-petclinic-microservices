import { useCallback } from 'react';
import { listVets } from '../../api/vets';
import { useApi } from '../../hooks/useApi';
import ErrorBanner from '../../components/common/ErrorBanner';

export default function VetListPage() {
  const fetcher = useCallback(() => listVets(), []);
  const { data: vets, error } = useApi(fetcher, []);

  return (
    <>
      <h2>Veterinarians</h2>
      <ErrorBanner message={error} />
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Specialties</th>
          </tr>
        </thead>
        <tbody>
          {(vets ?? []).map((vet) => (
            <tr key={vet.id}>
              <td>
                {vet.firstName} {vet.lastName}
              </td>
              <td>{vet.specialties.map((s) => s.name).join(' ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
