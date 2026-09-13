import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { listOwners } from '../../api/owners';
import { useApi } from '../../hooks/useApi';
import ErrorBanner from '../../components/common/ErrorBanner';

export default function OwnerListPage() {
  const [query, setQuery] = useState('');
  const fetcher = useCallback(() => listOwners(), []);
  const { data: owners, error } = useApi(fetcher, []);

  const filtered = (owners ?? []).filter((owner) => {
    if (!query.trim()) return true;
    const haystack = `${owner.firstName} ${owner.lastName} ${owner.address} ${owner.city} ${owner.telephone}`.toLowerCase();
    return haystack.includes(query.toLowerCase());
  });

  return (
    <>
      <h2>Owners</h2>
      <ErrorBanner message={error} />

      <form onSubmit={(e) => e.preventDefault()} style={{ maxWidth: '20em', marginTop: '2em' }}>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search Filter"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </form>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th className="hidden-sm hidden-xs">Address</th>
            <th>City</th>
            <th>Telephone</th>
            <th className="hidden-xs">Pets</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((owner) => (
            <tr key={owner.id}>
              <td>
                <Link to={`/owners/details/${owner.id}`}>
                  {owner.firstName} {owner.lastName}
                </Link>
              </td>
              <td className="hidden-sm hidden-xs">{owner.address}</td>
              <td>{owner.city}</td>
              <td>{owner.telephone}</td>
              <td className="hidden-xs">
                {owner.pets.map((pet) => (
                  <span key={pet.id}>{pet.name} </span>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
