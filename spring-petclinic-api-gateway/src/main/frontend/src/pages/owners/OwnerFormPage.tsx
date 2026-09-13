import { FormEvent, useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createOwner, getOwner, updateOwner } from '../../api/owners';
import { useApi } from '../../hooks/useApi';
import { ApiError } from '../../api/client';
import ErrorBanner from '../../components/common/ErrorBanner';
import type { Owner } from '../../types/domain';

const EMPTY_OWNER: Owner = {
  firstName: '',
  lastName: '',
  address: '',
  city: '',
  telephone: '',
  pets: [],
};

interface Touched {
  firstName?: boolean;
  lastName?: boolean;
  address?: boolean;
  city?: boolean;
  telephone?: boolean;
}

export default function OwnerFormPage() {
  const { ownerId } = useParams<{ ownerId: string }>();
  const navigate = useNavigate();
  const isEdit = Boolean(ownerId);

  const fetcher = useCallback(
    () => (isEdit ? getOwner(ownerId!) : Promise.resolve(EMPTY_OWNER)),
    [ownerId, isEdit],
  );
  const { data, error: loadError } = useApi(fetcher, [ownerId]);

  const [owner, setOwner] = useState<Owner>(EMPTY_OWNER);
  const [touched, setTouched] = useState<Touched>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (data) setOwner(data);
  }, [data]);

  const setField = (field: keyof Owner) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setOwner((prev) => ({ ...prev, [field]: e.target.value }));

  const markTouched = (field: keyof Touched) => () => setTouched((prev) => ({ ...prev, [field]: true }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    try {
      if (owner.id) {
        await updateOwner(owner.id, owner);
        navigate(`/owners/details/${owner.id}`);
      } else {
        const created = await createOwner(owner);
        navigate('/owners');
        void created;
      }
    } catch (err) {
      setSubmitError(err instanceof ApiError ? err.message : 'Something went wrong.');
    }
  };

  return (
    <>
      <h2>Owner</h2>
      <ErrorBanner message={loadError ?? submitError} />
      <form onSubmit={handleSubmit} style={{ maxWidth: '25em' }}>
        <div className="form-group">
          <label htmlFor="firstName">First name</label>
          <input
            className="form-control"
            value={owner.firstName}
            onChange={setField('firstName')}
            onBlur={markTouched('firstName')}
            id="firstName"
            name="firstName"
            required
          />
          {touched.firstName && !owner.firstName && (
            <span className="help-block">First name is required.</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last name</label>
          <input
            className="form-control"
            value={owner.lastName}
            onChange={setField('lastName')}
            onBlur={markTouched('lastName')}
            id="lastName"
            name="lastName"
            required
          />
          {touched.lastName && !owner.lastName && <span className="help-block">Last name is required.</span>}
        </div>

        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            className="form-control"
            value={owner.address}
            onChange={setField('address')}
            onBlur={markTouched('address')}
            id="address"
            name="address"
            required
          />
          {touched.address && !owner.address && <span className="help-block">Address is required.</span>}
        </div>

        <div className="form-group">
          <label htmlFor="city">City</label>
          <input
            className="form-control"
            value={owner.city}
            onChange={setField('city')}
            onBlur={markTouched('city')}
            id="city"
            name="city"
            required
          />
          {touched.city && !owner.city && <span className="help-block">City is required.</span>}
        </div>

        <div className="form-group">
          <label htmlFor="telephone">Telephone</label>
          <input
            className="form-control"
            value={owner.telephone}
            onChange={setField('telephone')}
            onBlur={markTouched('telephone')}
            pattern="[0-9]{12}"
            placeholder="905554443322"
            id="telephone"
            name="telephone"
            maxLength={12}
            required
          />
          {touched.telephone && !owner.telephone && (
            <span className="help-block">Telephone is required.</span>
          )}
        </div>

        <div className="form-group">
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </div>
      </form>
    </>
  );
}
