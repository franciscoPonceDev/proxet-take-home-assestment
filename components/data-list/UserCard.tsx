import type { User } from "@/lib/usersApi";

export interface UserCardProps {
  user: User;
}

export const UserCard = ({ user }: UserCardProps) => {
  const fullName = `${user.name.first}${
    user.name.middle ? ` ${user.name.middle}` : ""
  } ${user.name.last}`;

  const jobDescription = `${user.job.title} at ${user.job.company}`;

  const address = `${user.location.street}, ${user.location.city}, ${user.location.state}, ${user.location.country}, ${user.location.zip}`;

  return (
    <article
      aria-label={fullName}
      className="flex flex-col rounded border border-slate-200 bg-white px-4 py-3 text-left shadow-sm"
    >
      <h2 className="text-sm font-semibold text-slate-900">{fullName}</h2>
      <p className="mt-1 text-sm text-slate-700">{jobDescription}</p>
      <p className="mt-1 text-xs text-slate-500">{address}</p>
      <p className="mt-2 text-xs text-slate-400">
        Phone: <span className="font-medium text-slate-600">{user.phoneNumber}</span>
      </p>
    </article>
  );
};


