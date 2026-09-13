import { FormEvent, useCallback, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createVisit, listVisits } from '../../api/visits';
import { useApi } from '../../hooks/useApi';
import { ApiError } from '../../api/client';
import ErrorBanner from '../../components/common/ErrorBanner';
import { toDateInputValue } from '../../utils/date';

export default function VisitsPage() {
  const { ownerId, petId } = useParams<{ ownerId: string; petId: string }>();
  const navigate = useNavigate();

  const fetcher = useCallback(() => listVisits(ownerId!, petId!), [ownerId, petId]);
  const { data: visits, error: loadError } = useApi(fetcher, [ownerId, petId]);

  const [date, setDate] = useState(toDateInputValue(new Date()));
  const [description, setDescription] = useState('');
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    try {
      await createVisit(ownerId!, petId!, { date, description });
      navigate(`/owners/details/${ownerId}`);
    } catch (err) {
      setSubmitError(err instanceof ApiError ? err.message : 'Something went wrong.');
    }
  };

  return (
    <>
      <h2>Visits</h2>
      <ErrorBanner message={loadError ?? submitError} />

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Date</label>
          <input type="date" className="form-control" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            className="form-control"
            style={{ resize: 'vertical' }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <button className="btn btn-primary" type="submit">
            Add New Visit
          </button>
        </div>
      </form>

      <h3>Previous Visits</h3>
      <table className="table">
        <tbody>
          {(visits ?? []).map((v) => (
            <tr key={v.id}>
              <td className="col-sm-2">{v.date}</td>
              <td style={{ whiteSpace: 'pre-line' }}>{v.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
