'use client';

import {
	ColumnDef,
	SortingState,
	getCoreRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	sortingFns,
	useReactTable,
	flexRender,
} from "@tanstack/react-table";
import { Fragment, useEffect, useMemo, useState } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";

export type SelectFilter = {
	type: "select";
	columnId: string;
	label?: string;
	options: Array<{ label: string; value: string }>;
};

export type DateRangeFilter = {
	type: "dateRange";
	columnId: string; // ISO date string or parseable by Date
	label?: string;
};

export type NumberRangeFilter = {
	type: "numberRange";
	columnId: string;
	label?: string;
};

export type CheckboxGroupFilter = {
	type: "checkboxGroup";
	columnId: string;
	label?: string;
	options: Array<{ label: string; value: string }>;
};

export type TextSearchFilter = {
	type: "search";
	placeholder?: string;
};

export type FilterConfig = Array<SelectFilter | DateRangeFilter | NumberRangeFilter | TextSearchFilter | CheckboxGroupFilter>;

export type DataTableProps<TData> = {
	data: TData[];
	columns: ColumnDef<TData, unknown>[];
	pageSizeOptions?: number[];
	initialPageSize?: number;
	filters?: FilterConfig;
	quickFiltersTopBar?: Array<SelectFilter>;
	className?: string;
};

type InternalFilterState = {
	search: string;
	selects: Record<string, string>;
	dateRanges: Record<string, { from?: string; to?: string }>;
	numberRanges: Record<string, { min?: string; max?: string }>;
	checkboxGroups: Record<string, Record<string, boolean>>;
};

function toLowerString(value: unknown): string {
	if (value == null) return "";
	return String(value).toLowerCase();
}

function isValueInDateRange(value: unknown, from?: string, to?: string): boolean {
	if (!value) return false;
	const d = new Date(String(value));
	if (Number.isNaN(d.getTime())) return false;
	const afterFrom = from ? d >= new Date(from) : true;
	const beforeTo = to ? d <= new Date(to) : true;
	return afterFrom && beforeTo;
}

function isValueInNumberRange(value: unknown, min?: string, max?: string): boolean {
	const num = Number(value);
	if (Number.isNaN(num)) return false;
	const geMin = min !== undefined && min !== "" ? num >= Number(min) : true;
	const leMax = max !== undefined && max !== "" ? num <= Number(max) : true;
	return geMin && leMax;
}

export function DataTable<TData>({
	data,
	columns,
	pageSizeOptions = [10, 20, 50],
	initialPageSize = 10,
	filters = [{ type: "search", placeholder: "Search…" }],
	quickFiltersTopBar = [],
	className,
}: DataTableProps<TData>) {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [pageSize, setPageSize] = useState<number>(initialPageSize);
	const [filterState, setFilterState] = useState<InternalFilterState>({
		search: "",
		selects: {},
		dateRanges: {},
		numberRanges: {},
		checkboxGroups: {},
	});
	const [isFilterOpen, setIsFilterOpen] = useState(false);
	const [draftFilter, setDraftFilter] = useState<InternalFilterState>({
		search: "",
		selects: {},
		dateRanges: {},
		numberRanges: {},
		checkboxGroups: {},
	});

	// Compute filtered data client-side
	const filteredData = useMemo(() => {
		let rows = [...data];
		// Text search across all fields (stringified)
		const search = filterState.search.trim().toLowerCase();
		if (search) {
			rows = rows.filter((row) => {
				const record = row as unknown as Record<string, unknown>;
				return Object.values(record).some((v) => toLowerString(v).includes(search));
			});
		}
		// Select filters
		for (const [colId, value] of Object.entries(filterState.selects)) {
			if (!value || value === "__all__") continue;
			rows = rows.filter((row) => {
				const record = row as unknown as Record<string, unknown>;
				return String(record[colId]) === value;
			});
		}
		// Checkbox groups (OR within a group)
		for (const [colId, group] of Object.entries(filterState.checkboxGroups)) {
			const selectedValues = Object.entries(group).filter(([, checked]) => checked).map(([v]) => v);
			if (selectedValues.length === 0) continue;
			rows = rows.filter((row) => {
				const record = row as unknown as Record<string, unknown>;
				return selectedValues.includes(String(record[colId]));
			});
		}
		// Date ranges
		for (const [colId, { from, to }] of Object.entries(filterState.dateRanges)) {
			if (!from && !to) continue;
			rows = rows.filter((row) => {
				const record = row as unknown as Record<string, unknown>;
				return isValueInDateRange(record[colId], from, to);
			});
		}
		// Number ranges
		for (const [colId, { min, max }] of Object.entries(filterState.numberRanges)) {
			if (!min && !max) continue;
			rows = rows.filter((row) => {
				const record = row as unknown as Record<string, unknown>;
				return isValueInNumberRange(record[colId], min, max);
			});
		}
		return rows;
	}, [data, filterState]);

	const table = useReactTable({
		data: filteredData,
		columns,
		state: { sorting },
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		sortingFns: {
			alphanumeric: sortingFns.alphanumeric,
			datetime: sortingFns.datetime,
		},
	});

	// Keep table page size in sync with control
	useEffect(() => {
		table.setPageSize(pageSize);
	}, [pageSize, table]);

	return (
		<div className={`relative ${className ?? ""}`}>
			{/* Top bar with quick filters, search, and filter drawer button */}
			<div className="mb-4 flex flex-wrap items-center justify-between gap-3">
				<div className="flex flex-wrap items-center gap-3">
					{quickFiltersTopBar.map((qf, idx) => {
						const value = filterState.selects[qf.columnId] ?? "__all__";
						const options = qf.options.map((o) => ({ label: o.label, value: o.value }));
						const selected = options.find((o) => o.value === value) ?? null;
						return (
							<div key={`qf-${qf.columnId}-${idx}`} className="flex items-center gap-2">
								<label className="text-sm text-slate-500 font-medium">{qf.label ?? qf.columnId}</label>
								<div className="min-w-[200px]">
									<Select
										options={options}
										value={selected}
										placeholder="All"
										isClearable
										onChange={(opt) =>
											setFilterState((prev) => ({
												...prev,
												selects: { ...prev.selects, [qf.columnId]: opt ? String(opt.value) : "__all__" },
											}))
										}
										styles={{
											control: (base) => ({
												...base,
												minHeight: "36px",
												borderColor: "#e2e8f0",
												backgroundColor: "#ffffff",
											}),
											menu: (base) => ({
												...base,
												zIndex: 50,
											}),
										}}
									/>
								</div>
							</div>
						);
					})}
				</div>
				<div className="flex items-center gap-3">
					<input
						type="text"
						placeholder={filters.find((f) => f.type === "search")?.placeholder ?? "Search…"}
						className="h-9 w-[260px] rounded border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none focus:border-[#FF5A5F] focus:ring-1 focus:ring-[#FF5A5F]"
						value={filterState.search}
						onChange={(e) => setFilterState((prev) => ({ ...prev, search: e.target.value }))}
					/>
					<button
						type="button"
						className="inline-flex items-center gap-2 rounded border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
						onClick={() => {
							setDraftFilter(filterState);
							setIsFilterOpen(true);
						}}
						aria-label="Open filters"
					>
						<span aria-hidden>🔎</span>
						Filters
					</button>
				</div>
			</div>

			<div className="overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
				<table className="min-w-full text-sm">
					<thead className="bg-slate-50">
						{table.getHeaderGroups().map((headerGroup) => (
							<tr key={headerGroup.id} className="border-b border-slate-200">
								{headerGroup.headers.map((header) => {
									return (
										<th
											key={header.id}
											className="px-4 py-3 text-left font-semibold text-slate-700 select-none whitespace-nowrap"
										>
											{header.isPlaceholder ? null : (
												<button
													type="button"
													onClick={header.column.getToggleSortingHandler()}
													className="inline-flex items-center gap-1 hover:text-slate-900 transition-colors"
												>
													{flexRender(header.column.columnDef.header, header.getContext())}
													{{
														asc: " ▲",
														desc: " ▼",
													}[header.column.getIsSorted() as string] ?? null}
												</button>
											)}
										</th>
									);
								})}
							</tr>
						))}
					</thead>
					<tbody className="divide-y divide-slate-100 bg-white text-slate-900">
						{table.getRowModel().rows.length ? (
							table.getRowModel().rows.map((row) => (
								<tr key={row.id} className="hover:bg-slate-50/50 transition-colors">
									{row.getVisibleCells().map((cell) => (
										<td key={cell.id} className="px-4 py-3 align-middle text-slate-800">
											{flexRender(cell.column.columnDef.cell, cell.getContext())}
										</td>
									))}
								</tr>
							))
						) : (
							<tr>
								<td colSpan={columns.length} className="px-4 py-8 text-center text-slate-500 font-medium">
									No records found
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>

			<div className="mt-4 flex flex-wrap items-center justify-between gap-3 px-1">
				<div className="flex items-center gap-3">
					<select
						className="rounded-md border border-slate-200 bg-white px-2 py-1.5 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#FF5A5F]/20"
						value={pageSize}
						onChange={(e) => setPageSize(Number(e.target.value))}
					>
						{pageSizeOptions.map((size) => (
							<option key={size} value={size}>
								{size} per page
							</option>
						))}
					</select>
					<PaginationSummary
						tableTotal={filteredData.length}
						pageIndex={table.getState().pagination.pageIndex}
						pageSize={pageSize}
					/>
				</div>
				<NumberedPagination
					pageIndex={table.getState().pagination.pageIndex}
					pageCount={table.getPageCount()}
					onPageChange={(idx) => table.setPageIndex(idx)}
				/>
			</div>

			<FilterDrawer
				open={isFilterOpen}
				onClose={() => setIsFilterOpen(false)}
				filters={filters}
				filterState={draftFilter}
				onChange={setDraftFilter}
				onReset={() =>
					setDraftFilter({
						search: "",
						selects: {},
						dateRanges: {},
						numberRanges: {},
						checkboxGroups: {},
					})
				}
				onApply={() => {
					setFilterState(draftFilter);
					setIsFilterOpen(false);
					// Reset to first page after applying new filters
					table.setPageIndex(0);
				}}
			/>
		</div>
	);
}

function TableToolbar({
	filters,
	filterState,
	onChange,
}: {
	filters: FilterConfig;
	filterState: InternalFilterState;
	onChange: (next: InternalFilterState) => void;
}) {
	return (
		<div className="mb-3 flex flex-wrap items-end gap-3">
			{filters.map((cfg, idx) => {
				if (cfg.type === "search") {
					return (
						<div key={`search-${idx}`} className="flex flex-col gap-1">
							<label className="text-xs text-slate-500 font-medium">Search</label>
							<input
								type="text"
								placeholder={cfg.placeholder ?? "Search…"}
								className="h-9 w-[240px] rounded border border-slate-200 bg-white px-3 text-sm focus:border-[#FF5A5F] focus:ring-1 focus:ring-[#FF5A5F] outline-none"
								value={filterState.search}
								onChange={(e) => onChange({ ...filterState, search: e.target.value })}
							/>
						</div>
					);
				}
				if (cfg.type === "select") {
					const value = filterState.selects[cfg.columnId] ?? "__all__";
					return (
						<div key={`select-${cfg.columnId}`} className="flex flex-col gap-1">
							<label className="text-xs text-slate-500 font-medium">{cfg.label ?? cfg.columnId}</label>
							<select
								className="h-9 min-w-[160px] rounded border border-slate-200 bg-white px-2 text-sm focus:border-[#FF5A5F] focus:ring-1 focus:ring-[#FF5A5F] outline-none"
								value={value}
								onChange={(e) =>
									onChange({
										...filterState,
										selects: { ...filterState.selects, [cfg.columnId]: e.target.value },
									})
								}
							>
								<option value="__all__">All</option>
								{cfg.options.map((opt) => (
									<option key={opt.value} value={opt.value}>
										{opt.label}
									</option>
								))}
							</select>
						</div>
					);
				}
				if (cfg.type === "dateRange") {
					const range = filterState.dateRanges[cfg.columnId] ?? {};
					return (
						<div key={`date-${cfg.columnId}`} className="flex flex-col gap-1">
							<label className="text-xs text-slate-500 font-medium">{cfg.label ?? `${cfg.columnId} range`}</label>
							<div className="flex items-center gap-2">
								<input
									type="date"
									className="h-9 rounded border border-slate-200 bg-white px-2 text-sm focus:border-[#FF5A5F] outline-none"
									value={range.from ?? ""}
									onChange={(e) =>
										onChange({
											...filterState,
											dateRanges: { ...filterState.dateRanges, [cfg.columnId]: { ...range, from: e.target.value } },
										})
									}
								/>
								<span className="text-xs text-slate-400 font-medium">to</span>
								<input
									type="date"
									className="h-9 rounded border border-slate-200 bg-white px-2 text-sm focus:border-[#FF5A5F] outline-none"
									value={range.to ?? ""}
									onChange={(e) =>
										onChange({
											...filterState,
											dateRanges: { ...filterState.dateRanges, [cfg.columnId]: { ...range, to: e.target.value } },
										})
									}
								/>
							</div>
						</div>
					);
				}
				if (cfg.type === "numberRange") {
					const range = filterState.numberRanges[cfg.columnId] ?? {};
					return (
						<div key={`num-${cfg.columnId}`} className="flex flex-col gap-1">
							<label className="text-xs text-slate-500 font-medium">{cfg.label ?? `${cfg.columnId} range`}</label>
							<div className="flex items-center gap-2">
								<input
									type="number"
									inputMode="numeric"
									className="h-9 w-24 rounded border border-slate-200 bg-white px-2 text-sm outline-none focus:border-[#FF5A5F]"
									placeholder="Min"
									value={range.min ?? ""}
									onChange={(e) =>
										onChange({
											...filterState,
											numberRanges: { ...filterState.numberRanges, [cfg.columnId]: { ...range, min: e.target.value } },
										})
									}
								/>
								<span className="text-xs text-slate-400 font-medium">to</span>
								<input
									type="number"
									inputMode="numeric"
									className="h-9 w-24 rounded border border-slate-200 bg-white px-2 text-sm outline-none focus:border-[#FF5A5F]"
									placeholder="Max"
									value={range.max ?? ""}
									onChange={(e) =>
										onChange({
											...filterState,
											numberRanges: { ...filterState.numberRanges, [cfg.columnId]: { ...range, max: e.target.value } },
										})
									}
								/>
							</div>
						</div>
					);
				}
				return null;
			})}
		</div>
	);
}

function FilterDrawer(props: {
	open: boolean;
	onClose: () => void;
	filters: FilterConfig;
	filterState: InternalFilterState;
	onChange: (next: InternalFilterState) => void;
	onReset: () => void;
	onApply: () => void;
}) {
	const { open, onClose, filters, filterState, onChange, onReset, onApply } = props;
	return (
		<Fragment>
			{open ? <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" onClick={onClose} aria-hidden="true" /> : null}
			<div
				className={`fixed right-0 top-0 z-50 h-full w-[360px] transform border-l border-slate-200 bg-white shadow-2xl transition-transform duration-300 ease-in-out ${
					open ? "translate-x-0" : "translate-x-full"
				}`}
				role="dialog"
				aria-modal="true"
			>
				<div className="flex items-center justify-between border-b border-slate-100 p-5">
					<h3 className="text-lg font-bold text-slate-900">Filters</h3>
					<button className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors" onClick={onClose} aria-label="Close filters">
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
					</button>
				</div>
				<div className="flex h-[calc(100%-140px)] flex-col gap-6 overflow-y-auto p-5">
					{filters.map((cfg, idx) => {
						if (cfg.type === "search") return null;
						return <FilterField key={`${cfg.type}-${idx}`} cfg={cfg} filterState={filterState} onChange={onChange} />;
					})}
				</div>
				<div className="absolute bottom-0 w-full flex items-center justify-between border-t border-slate-100 bg-slate-50/80 p-5 backdrop-blur-sm">
					<button className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-sm" onClick={onReset}>
						Reset All
					</button>
					<button className="rounded-lg bg-[#FF5A5F] px-6 py-2.5 text-sm font-medium text-white hover:bg-[#ff474d] transition-colors shadow-sm" onClick={onApply}>
						Apply Filters
					</button>
				</div>
			</div>
		</Fragment>
	);
}

function FilterField({
	cfg,
	filterState,
	onChange,
}: {
	cfg: FilterConfig[number];
	filterState: InternalFilterState;
	onChange: (next: InternalFilterState) => void;
}) {
	if (cfg.type === "select") {
		const value = filterState.selects[cfg.columnId] ?? "__all__";
		const options = cfg.options.map((o) => ({ label: o.label, value: o.value }));
		const selected = options.find((o) => o.value === value) ?? null;
		return (
			<div className="flex flex-col gap-2">
				<label className="text-sm font-semibold text-slate-800">{cfg.label ?? cfg.columnId}</label>
				<div className="w-full">
					<Select
						options={options}
						value={selected}
						placeholder="Select option..."
						isClearable
						onChange={(opt) =>
							onChange({
								...filterState,
								selects: { ...filterState.selects, [cfg.columnId]: opt ? String(opt.value) : "__all__" },
							})
						}
						styles={{
							control: (base) => ({
								...base,
								minHeight: "42px",
								borderColor: "#e2e8f0",
								backgroundColor: "#ffffff",
								borderRadius: "0.5rem"
							}),
							menu: (base) => ({
								...base,
								zIndex: 50,
							}),
						}}
					/>
				</div>
			</div>
		);
	}
	if (cfg.type === "checkboxGroup") {
		const group = filterState.checkboxGroups[cfg.columnId] ?? {};
		return (
			<div className="flex flex-col gap-3">
				<label className="text-sm font-semibold text-slate-800">{cfg.label ?? cfg.columnId}</label>
				<div className="space-y-3">
					{cfg.options.map((opt) => {
						const checked = Boolean(group[opt.value]);
						return (
							<label key={opt.value} className="flex items-center gap-3 text-sm text-slate-700 cursor-pointer group">
								<div className="relative flex items-center justify-center">
									<input
										type="checkbox"
										className="peer sr-only"
										checked={checked}
										onChange={(e) => {
											onChange({
												...filterState,
												checkboxGroups: {
													...filterState.checkboxGroups,
													[cfg.columnId]: { ...group, [opt.value]: e.target.checked },
												},
											});
										}}
									/>
									<div className="h-5 w-5 rounded border border-slate-300 bg-white transition-all peer-checked:border-[#FF5A5F] peer-checked:bg-[#FF5A5F] group-hover:border-[#FF5A5F]/50"></div>
									<svg className="absolute h-3.5 w-3.5 text-white opacity-0 transition-opacity peer-checked:opacity-100 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
								</div>
								<span className="font-medium">{opt.label}</span>
							</label>
						);
					})}
				</div>
			</div>
		);
	}
	if (cfg.type === "dateRange") {
		const range = filterState.dateRanges[cfg.columnId] ?? {};
		return (
			<div className="flex flex-col gap-3">
				<label className="text-sm font-semibold text-slate-800">{cfg.label ?? `${cfg.columnId} Range`}</label>
				<div className="flex items-center gap-3">
					<DatePicker
						selected={range.from ? new Date(range.from) : null}
						onChange={(date) =>
							onChange({
								...filterState,
								dateRanges: {
									...filterState.dateRanges,
									[cfg.columnId]: { ...range, from: date ? new Date(date).toISOString().slice(0, 10) : undefined },
								},
							})
						}
						className="w-full h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm focus:border-[#FF5A5F] outline-none"
						placeholderText="Start date"
						dateFormat="MMM d, yyyy"
						isClearable
					/>
					<span className="text-xs font-bold text-slate-400">TO</span>
					<DatePicker
						selected={range.to ? new Date(range.to) : null}
						onChange={(date) =>
							onChange({
								...filterState,
								dateRanges: {
									...filterState.dateRanges,
									[cfg.columnId]: { ...range, to: date ? new Date(date).toISOString().slice(0, 10) : undefined },
								},
							})
						}
						className="w-full h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm focus:border-[#FF5A5F] outline-none"
						placeholderText="End date"
						dateFormat="MMM d, yyyy"
						isClearable
					/>
				</div>
			</div>
		);
	}
	if (cfg.type === "numberRange") {
		const range = filterState.numberRanges[cfg.columnId] ?? {};
		return (
			<div className="flex flex-col gap-3">
				<label className="text-sm font-semibold text-slate-800">{cfg.label ?? `${cfg.columnId} Range`}</label>
				<div className="flex items-center gap-3">
					<input
						type="number"
						inputMode="numeric"
						className="w-full h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-[#FF5A5F]"
						placeholder="Min"
						value={range.min ?? ""}
						onChange={(e) =>
							onChange({
								...filterState,
								numberRanges: { ...filterState.numberRanges, [cfg.columnId]: { ...range, min: e.target.value } },
							})
						}
					/>
					<span className="text-xs font-bold text-slate-400">TO</span>
					<input
						type="number"
						inputMode="numeric"
						className="w-full h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-[#FF5A5F]"
						placeholder="Max"
						value={range.max ?? ""}
						onChange={(e) =>
							onChange({
								...filterState,
								numberRanges: { ...filterState.numberRanges, [cfg.columnId]: { ...range, max: e.target.value } },
							})
						}
					/>
				</div>
			</div>
		);
	}
	return null;
}

function PaginationSummary({ tableTotal, pageIndex, pageSize }: { tableTotal: number; pageIndex: number; pageSize: number }) {
	const start = tableTotal === 0 ? 0 : pageIndex * pageSize + 1;
	const end = Math.min(tableTotal, (pageIndex + 1) * pageSize);
	return (
		<div className="text-sm font-medium text-slate-500">
			Showing <span className="text-slate-900">{start}</span> to <span className="text-slate-900">{end}</span> of <span className="text-slate-900">{tableTotal}</span> records
		</div>
	);
}

function NumberedPagination({
	pageIndex,
	pageCount,
	onPageChange,
}: {
	pageIndex: number;
	pageCount: number;
	onPageChange: (idx: number) => void;
}) {
	const pages = useMemo(() => {
		const total = pageCount || 1;
		const current = pageIndex + 1;
		const visible: Array<number | "ellipsis"> = [];
		const push = (n: number | "ellipsis") => visible.push(n);
		const addRange = (start: number, end: number) => {
			for (let i = start; i <= end; i++) push(i);
		};
		if (total <= 7) {
			addRange(1, total);
		} else {
			addRange(1, 2);
			if (current > 4) push("ellipsis");
			const start = Math.max(3, current - 1);
			const end = Math.min(total - 2, current + 1);
			addRange(start, end);
			if (current < total - 3) push("ellipsis");
			addRange(total - 1, total);
		}
		return visible;
	}, [pageIndex, pageCount]);

	const toIndex = (pageNum: number) => pageNum - 1;
	const canPrev = pageIndex > 0;
	const canNext = pageIndex < (pageCount || 1) - 1;

	return (
		<div className="flex items-center gap-1.5">
			<button
				className="rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
				onClick={() => onPageChange(pageIndex - 1)}
				disabled={!canPrev}
				aria-label="Previous page"
			>
				Prev
			</button>
			{pages.map((p, idx) =>
				p === "ellipsis" ? (
					<span key={`e-${idx}`} className="px-2 text-slate-400 font-medium">
						…
					</span>
				) : (
					<button
						key={p}
						className={`rounded-md min-w-[32px] px-2 py-1.5 text-sm font-medium transition-colors ${
							pageIndex === toIndex(p) 
								? "bg-[#FF5A5F] text-white border border-[#FF5A5F] shadow-sm" 
								: "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-slate-900"
						}`}
						onClick={() => onPageChange(toIndex(p))}
						aria-current={pageIndex === toIndex(p) ? "page" : undefined}
					>
						{p}
					</button>
				)
			)}
			<button
				className="rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
				onClick={() => onPageChange(pageIndex + 1)}
				disabled={!canNext}
				aria-label="Next page"
			>
				Next
			</button>
		</div>
	);
}
