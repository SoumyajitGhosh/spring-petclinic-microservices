import { FormEvent, useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createPet, getPet, listPetTypes, updatePet } from '../../api/pets';
import { getOwner } from '../../api/owners';
import { useApi } from '../../hooks/useApi';
import { ApiError } from '../../api/client';
import ErrorBanner from '../../components/common/ErrorBanner';
import type { PetType } from '../../types/domain';
import { toDateInputValue } from '../../utils/date';

interface PetFormState {
  id: number;
  name: string;
  birthDate: string;
  ownerName: string;
}

const EMPTY_PET: PetFormState = { id: 0, name: '', birthDate: '', ownerName: '' };

export default function PetFormPage() {
  const { ownerId, petId } = useParams<{ ownerId: string; petId?: string }>();
  const navigate = useNavigate();
  const isEdit = Boolean(petId);

  const fetcher = useCallback(async (): Promise<{ types: PetType[]; pet: PetFormState; typeId: string }> => {
    const types = await listPetTypes();

    if (petId) {
      const pet = await getPet(ownerId!, petId);
      return {
        types,
        pet: {
          id: pet.id ?? 0,
          name: pet.name,
          birthDate: toDateInputValue(pet.birthDate),
          ownerName: '',
        },
        typeId: String(pet.type.id),
      };
    }

    const owner = await getOwner(ownerId!);
    return {
      types,
      pet: { ...EMPTY_PET, ownerName: `${owner.firstName} ${owner.lastName}` },
      typeId: types[0] ? String(types[0].id) : '1',
    };
  }, [ownerId, petId]);

  const { data, error: loadError } = useApi(fetcher, [ownerId, petId]);

  const [pet, setPet] = useState<PetFormState>(EMPTY_PET);
  const [types, setTypes] = useState<PetType[]>([]);
  const [typeId, setTypeId] = useState('1');
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (data) {
      setPet(data.pet);
      setTypes(data.types);
      setTypeId(data.typeId);
    }
  }, [data]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    const payload = { id: pet.id, name: pet.name, birthDate: pet.birthDate, typeId };
    try {
      if (isEdit) {
        await updatePet(ownerId!, petId!, payload);
      } else {
        await createPet(ownerId!, payload);
      }
      navigate(`/owners/details/${ownerId}`);
    } catch (err) {
      setSubmitError(err instanceof ApiError ? err.message : 'Something went wrong.');
    }
  };

  return (
    <>
      <h2>Pet</h2>
      <ErrorBanner message={loadError ?? submitError} />
      <form className="form-horizontal" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="col-sm-2 control-label">Owner</label>
          <div className="col-sm-6">
            <p className="form-control-static">{pet.ownerName}</p>
          </div>
        </div>

        <div className="form-group">
          <label className="col-sm-2 control-label">Name </label>
          <div className="col-sm-6">
            <input
              className="form-control col-sm-4"
              value={pet.name}
              onChange={(e) => setPet((prev) => ({ ...prev, name: e.target.value }))}
              name="name"
              required
              type="text"
            />
          </div>
        </div>

        <div className="form-group">
          <label className="col-sm-2 control-label">Birth date</label>
          <div className="col-sm-6">
            <input
              className="form-control"
              value={pet.birthDate}
              onChange={(e) => setPet((prev) => ({ ...prev, birthDate: e.target.value }))}
              required
              type="date"
            />
          </div>
        </div>

        <div className="form-group">
          <label className="col-sm-2 control-label">Type</label>
          <div className="col-sm-6">
            <select className="form-control" value={typeId} onChange={(e) => setTypeId(e.target.value)}>
              {types.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <div className="col-sm-6 col-sm-offset-2">
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
