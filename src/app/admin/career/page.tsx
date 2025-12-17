"use client";

import { useCareers, useDeleteCareer } from "@/hooks/useCareer";
import Link from "next/link";
import { format } from "date-fns";
import { toast } from "sonner";
import { TableSkeleton } from "@/components/ui/Skeleton";
import { MapPin, Briefcase, Laptop } from "lucide-react";

export default function AdminCareerPage() {
  const { data: careers, isLoading, error } = useCareers();
  const deleteMutation = useDeleteCareer();

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this job posting?")) return;

    toast.promise(deleteMutation.mutateAsync(id), {
      loading: "Deleting job posting...",
      success: "Job posting deleted successfully!",
      error: "Failed to delete job posting",
    });
  };

  if (isLoading) {
    return (
      <div>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-unbounded font-bold text-dark mb-2">
              Careers Management
            </h1>
            <p className="text-gray-text">Manage job openings</p>
          </div>
        </div>
        <TableSkeleton rows={3} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="card max-w-md mx-auto text-center">
        <h2 className="text-xl font-bold text-red-600 mb-4">Error</h2>
        <p className="text-gray-text mb-4">{error.message}</p>
        <button
          onClick={() => window.location.reload()}
          className="btn-primary"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-unbounded font-bold text-dark mb-2">
            Careers Management
          </h1>
          <p className="text-gray-text">Manage job openings</p>
        </div>
        <Link href="/admin/career/new" className="btn-primary">
          + Post New Job
        </Link>
      </div>

      {careers && careers.length > 0 ? (
        <div className="grid gap-4">
          {careers.map((career) => (
            <div key={career._id} className="card">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <h3 className="text-xl font-unbounded font-bold text-dark">
                      {career.title}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        career.isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {career.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-2">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-primary-orange" />
                      {career.location}
                    </span>

                    <span className="flex items-center gap-1.5">
                      <Briefcase className="w-4 h-4 text-primary-teal" />
                      {career.type}
                    </span>

                    <span className="flex items-center gap-1.5">
                      <Laptop className="w-4 h-4 text-primary-orange" />
                      {career.experience}
                    </span>
                  </div>
                  <p className="text-gray-text text-sm line-clamp-2">
                    {career.description}
                  </p>
                  {career.postedDate && (
                    <p className="text-xs text-gray-400 mt-2">
                      Posted:{" "}
                      {format(new Date(career.postedDate), "MMM dd, yyyy")}
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  <Link
                    href={`/admin/career/${career._id}`}
                    className="btn-outline text-sm"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(career._id!)}
                    className="text-red-600 hover:text-red-800 px-3 py-2 text-sm font-semibold"
                    disabled={deleteMutation.isPending}
                  >
                    {deleteMutation.isPending ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card text-center py-12">
          <p className="text-gray-text text-lg mb-4">No job postings yet.</p>
          <Link href="/admin/career/new" className="btn-primary">
            + Post Your First Job
          </Link>
        </div>
      )}
    </div>
  );
}
