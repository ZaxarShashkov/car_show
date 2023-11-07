'use client';
import React, { Fragment, useState } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import Image from 'next/image';
import { manufacturers } from '@/constans';

type SearchManufacturerProps = {
	manufacturer: string;
	setManufacturer: (manufacturer: string) => void;
};

const SearchManufacturer = ({ setManufacturer, manufacturer }: SearchManufacturerProps) => {
	const [query, setQuery] = useState<string>('');

	const filteredManufacturers =
		query === ''
			? manufacturers
			: manufacturers.filter((item) =>
					item
						.toLowerCase()
						.replace(/\s+/g, '')
						.includes(query.toLowerCase().replace(/\s+/g, ''))
			  );

	return (
		<div className='search-manufacturer'>
			<Combobox value={manufacturer} onChange={setManufacturer}>
				<div className='relative w-full'>
					<Combobox.Button className='absolute top-[14px]'>
						<Image
							src='/car-logo.svg'
							width={20}
							height={20}
							className='ml-4'
							alt='Car Logo'
						/>
					</Combobox.Button>
					<Combobox.Input
						className='search-manufacturer__input'
						placeholder='Volkswagen'
						displayValue={(manufacturer: string) => manufacturer}
						onChange={(e) => setQuery(e.target.value)}
						autoComplete='off'
					/>
					<Transition
						as={Fragment}
						leave='transition ease-in duration-100'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'
						afterLeave={() => setQuery('')}>
						<Combobox.Options className='absolute bg-gray-600 z-10'>
							{filteredManufacturers.length === 0 && query !== '' ? (
								<Combobox.Option
									value={query}
									className='search-manufacturer__option'>
									Nothing found
								</Combobox.Option>
							) : (
								filteredManufacturers.map((manufacturer) => (
									<Combobox.Option
										key={manufacturer}
										value={manufacturer}
										className={({ active }) => `
									relative search-manufacturer__option
									${active ? 'bg-primary-blue text-white' : 'text-gray-900'}
									`}>
										{({ selected, active }) => {
											return (
												<>
													<span
														className={`block truncate ${
															selected ? 'font-medium' : 'font-normal'
														}`}>
														{manufacturer}
													</span>
													{selected ? (
														<span
															className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
																active
																	? 'text-white'
																	: 'text-teal-600'
															}`}></span>
													) : null}
												</>
											);
										}}
									</Combobox.Option>
								))
							)}
						</Combobox.Options>
					</Transition>
				</div>
			</Combobox>
		</div>
	);
};

export default SearchManufacturer;
