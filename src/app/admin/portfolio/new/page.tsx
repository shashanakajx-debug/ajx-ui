import PortfolioForm from '../_components/PortfolioForm';

export default function NewPortfolioPage() {
    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-unbounded font-bold text-dark mb-2">
                    Add New Project
                </h1>
                <p className="text-gray-text">
                    Add a new project to your portfolio
                </p>
            </div>

            <div className="card">
                <PortfolioForm />
            </div>
        </div>
    );
}
