"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { ApiError, getCurrentUser, type User } from "@/src/lib/api";

type PrivateRoutesProps = {
	children: ReactNode;
};

export default function PrivateRoutes({ children }: PrivateRoutesProps) {
	const router = useRouter();
	const [user, setUser] = useState<User | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		let active = true;

		getCurrentUser()
			.then(({ user: authenticatedUser }) => {
				if (active) setUser(authenticatedUser);
			})
			.catch((requestError: unknown) => {
				if (!active) return;

				if (requestError instanceof ApiError && requestError.status === 401) {
					router.replace("/login");
					return;
				}

				setError(
					requestError instanceof Error
						? requestError.message
						: "Unable to verify your session.",
				);
			});

		return () => {
			active = false;
		};
	}, [router]);

	if (error) {
		return (
			<main className="flex min-h-screen items-center justify-center bg-background px-6">
				<section className="w-full max-w-md rounded-xl border border-border bg-card p-8 text-center shadow-sm">
					<h1 className="text-lg font-semibold text-foreground">
						Connection unavailable
					</h1>
					<p className="mt-2 text-sm text-muted">{error}</p>
					<button
						type="button"
						onClick={() => window.location.reload()}
						className="mt-6 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white hover:bg-accent-hover"
					>
						Try again
					</button>
				</section>
			</main>
		);
	}

	if (!user) {
		return (
			<main className="flex min-h-screen items-center justify-center bg-background text-sm text-muted">
				Checking session...
			</main>
		);
	}

	return children;
}
