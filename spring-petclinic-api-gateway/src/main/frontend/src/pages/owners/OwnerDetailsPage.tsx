import { useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getOwnerDetails } from '../../api/owners';
import { useApi } from '../../hooks/useApi';
import ErrorBanner from '../../components/common/ErrorBanner';
import { formatDisplayDate } from '../../utils/date';

export default function OwnerDetailsPage() {
  const { ownerId } = useParams<{ ownerId: string }>();
  const fetcher = useCallback(() => getOwnerDetails(ownerId!), [ownerId]);
  const { data: owner, error } = useApi(fetcher, [ownerId]);

  return (
    <>
      <h2>Owner Information</h2>
      <ErrorBanner message={error} />

      {owner && (
        <>
          <table className="table table-striped">
            <tbody>
              <tr>
                <th className="col-sm-3">Name</th>
                <td>
                  <b>
                    {owner.firstName} {owner.lastName}
                  </b>
                </td>
              </tr>
              <tr>
                <th>Address</th>
                <td>{owner.address}</td>
              </tr>
              <tr>
                <th>City</th>
                <td>{owner.city}</td>
              </tr>
              <tr>
                <th>Telephone</th>
                <td>{owner.telephone}</td>
              </tr>
              <tr>
                <td>
                  <Link className="btn btn-primary" to={`/owners/${owner.id}/edit`}>
                    Edit Owner
                  </Link>
                </td>
                <td>
                  <Link className="btn btn-primary" to={`/owners/${owner.id}/new-pet`}>
                    Add New Pet
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>

          <h2>Pets and Visits</h2>
          <table className="table table-striped">
            <tbody>
              {owner.pets.map((pet) => (
                <tr key={pet.id}>
                  <td valign="top">
                    <dl className="dl-horizontal">
                      <dt>Name</dt>
                      <dd>
                        <Link to={`/owners/${owner.id}/pets/${pet.id}`}>{pet.name}</Link>
                      </dd>
                      <dt>Birth Date</dt>
                      <dd>{formatDisplayDate(pet.birthDate)}</dd>
                      <dt>Type</dt>
                      <dd>{pet.type.name}</dd>
                    </dl>
                  </td>
                  <td valign="top">
                    <table className="table-condensed">
                      <thead>
                        <tr>
                          <th>Visit Date</th>
                          <th>Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pet.visits.map((visit) => (
                          <tr key={visit.id}>
                            <td>{formatDisplayDate(visit.date)}</td>
                            <td>{visit.description}</td>
                          </tr>
                        ))}
                        <tr>
                          <td>
                            <Link to={`/owners/${owner.id}/pets/${pet.id}`}>Edit Pet</Link>
                          </td>
                          <td>
                            <Link to={`/owners/${owner.id}/pets/${pet.id}/visits`}>Add Visit</Link>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
}
