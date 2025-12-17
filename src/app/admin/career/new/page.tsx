import CareerForm from '../_components/CareerForm';

export default function NewCareerPage() {
    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-unbounded font-bold text-dark mb-2">
                    Post New Job
                </h1>
                <p className="text-gray-text">
                    Create a new career opportunity
                </p>
            </div>

            <div className="card">
                <CareerForm />
            </div>
        </div>
    );
}
