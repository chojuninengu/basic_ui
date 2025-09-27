import { Spinner } from "@/components/Spinner";
import { api } from "@/utils/api";
import type { NextPage } from "next";

const CustomersPage: NextPage = () => {
	const {
		data: customers,
		isLoading,
		error,
	} = api.budget.listCustomers.useQuery();

	if (isLoading) {
		return (
			<div className="flex h-screen items-center justify-center">
				<Spinner />
			</div>
		);
	}

	if (error) {
		return <div className="flex h-screen items-center justify-center">Error: {error.message}</div>;
	}

	return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm border-b border-white/10 dark:border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-xl font-bold text-black dark:text-white">LiteLLM</h1>
              <nav className="hidden md:flex items-center space-x-6">
                <a className="text-sm font-medium text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors" href="#">Dashboard</a>
                <a className="text-sm font-medium text-primary" href="#">Customers</a>
                <a className="text-sm font-medium text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors" href="#">Admin</a>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-sm font-medium text-red-500 hover:text-red-600 transition-colors">Sign Out</button>
              <button className="md:hidden flex items-center justify-center h-10 w-10 rounded-full bg-primary/20 text-primary">
                <span className="material-symbols-outlined">menu</span>
              </button>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-black dark:text-white">Customers</h2>
              <p className="mt-1 text-black/60 dark:text-white/60">Manage and monitor your customer accounts</p>
            </div>
            <button className="mt-4 md:mt-0 flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
              <span className="material-symbols-outlined text-base">add</span>
              Add Customer
            </button>
          </div>
          <div className="mb-6 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between">
            <div className="relative flex-1 md:max-w-xs">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-black/40 dark:text-white/40">search</span>
              </div>
              <input className="w-full pl-10 pr-4 py-2 border border-black/10 dark:border-white/10 bg-background-light dark:bg-background-dark rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition" placeholder="Search by name or email..." type="text"/>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <select className="appearance-none w-full md:w-auto bg-background-light dark:bg-background-dark border border-black/10 dark:border-white/10 rounded-lg py-2 pl-3 pr-8 text-sm focus:ring-2 focus:ring-primary focus:border-primary transition">
                  <option>All Status</option>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <span className="material-symbols-outlined text-sm">expand_more</span>
                </div>
              </div>
              <p className="text-sm text-black/60 dark:text-white/60">{customers?.length} customers found</p>
            </div>
          </div>
          <div className="bg-transparent overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-black/60 dark:text-white/60 uppercase">
                <tr>
                  <th className="px-6 py-3" scope="col">Customer</th>
                  <th className="px-6 py-3 hidden md:table-cell" scope="col">Email</th>
                  <th className="px-6 py-3 hidden lg:table-cell" scope="col">Status</th>
                  <th className="px-6 py-3 hidden lg:table-cell" scope="col">Created</th>
                  <th className="px-6 py-3 text-right" scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers?.map((customer, index) => (
                  <tr key={customer.user_id} className="border-b border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                    <th className="px-6 py-4 font-medium whitespace-nowrap" scope="row">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary text-sm">
                          {customer.user_id.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="text-base font-semibold text-black dark:text-white">Customer {index + 1}</div>
                          <div className="font-normal text-black/60 dark:text-white/60">ID: {customer.user_id}</div>
                        </div>
                      </div>
                    </th>
                    <td className="px-6 py-4 hidden md:table-cell text-black/80 dark:text-white/80">customer{index + 1}@example.com</td>
                    <td className="px-6 py-4 hidden lg:table-cell">
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-500/20 text-green-400">Active</span>
                    </td>
                    <td className="px-6 py-4 hidden lg:table-cell text-black/80 dark:text-white/80">2023-01-15</td>
                    <td className="px-6 py-4 text-right">
                      <button className="font-medium text-primary hover:underline">View details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
	);
};

export default CustomersPage;