import ServiceForm from '../_components/ServiceForm';

export default function NewServicePage() {
    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-unbounded font-bold text-dark mb-2">
                    Add New Service
                </h1>
                <p className="text-gray-text">
                    Create a new service offering
                </p>
            </div>

            <div className="card">
                <ServiceForm />
            </div>
        </div>
    );
}
