import BlogForm from '../_components/BlogForm';

export default function NewBlogPage() {
    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-unbounded font-bold text-dark mb-2">
                    Add New Blog Post
                </h1>
                <p className="text-gray-text">
                    Create a new blog post
                </p>
            </div>

            <div className="card">
                <BlogForm />
            </div>
        </div>
    );
}
