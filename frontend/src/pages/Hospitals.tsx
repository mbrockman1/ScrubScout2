import { api } from '../services/api';

const HospitalList = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await api.getHospitals();
        setHospitals(data);
      } catch (error) {
        console.error("Failed to load hospitals", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) return <div className="spinner">Loading Hospitals...</div>;

  return (
    <div>
      {hospitals.map(hospital => (
        <HospitalCard key={hospital.id} hospital={hospital} />
      ))}
    </div>
  );
};