'use client'

import {
  ArrowLeft,
  ArrowLeftToLine,
  ArrowRight,
  ArrowRightToLine,
} from 'lucide-react'
import { Skeleton } from './ui/skeleton'

type PaginationProps = {
  page: number
  itemsPerPage: number
  currentPage: number
  lastPage: number
}

type PaginationControlProps = {
  page: number
  currentPage: number
  lastPage: number
  handleChange: (key: keyof PaginationProps, value: number) => void
  isLoading: boolean
}

export default function PaginationControl({
  page,
  currentPage,
  lastPage,
  handleChange,
  isLoading,
}: PaginationControlProps) {
  return (
    <div className="m-0 flex justify-end gap-4 px-4 py-3">
      {isLoading && <Skeleton className="h-[40px] w-[220px] rounded-md" />}
      {!isLoading && (
        <>
          <select
            className="cursor-pointer rounded-lg border-none outline-none"
            onChange={(e) =>
              handleChange('itemsPerPage', Number(e.target.value))
            }
          >
            <option>10</option>
            <option>20</option>
            <option>30</option>
          </select>
          <button
            className={`cursor-pointer rounded-lg p-1 duration-150 ease-in-out ${
              page === 1 ? 'text-gray-300' : 'hover:bg-primary_hover'
            }`}
            onClick={() => handleChange('page', 1)}
            disabled={page === 1}
          >
            <ArrowLeftToLine size={20} />
          </button>
          <button
            className={`cursor-pointer rounded-lg p-1 duration-150 ease-in-out ${
              page === 1 ? 'text-gray-300' : 'hover:bg-primary_hover'
            }`}
            disabled={page === 1}
            onClick={() => handleChange('page', page - 1)}
          >
            <ArrowLeft size={20} />
          </button>

          {lastPage &&
            Array.from({ length: lastPage }, (_, index) => index + 1).map(
              (item, key) => (
                <button
                  onClick={() => handleChange('page', item)}
                  key={key}
                  className={`hover:bg-primary_hover cursor-pointer rounded-lg p-1 font-bold  duration-150 ease-in-out ${
                    page === item && 'bg-slate-400'
                  }`}
                >
                  {item}
                </button>
              ),
            )}

          <button
            className={`cursor-pointer rounded-lg p-1  duration-150 ease-in-out ${
              page === lastPage ? 'text-gray-300' : 'hover:bg-primary_hover'
            }`}
            onClick={() => handleChange('page', page + 1)}
            disabled={page === lastPage}
          >
            <ArrowRight />
          </button>

          <button
            className={`cursor-pointer rounded-lg p-1  duration-150 ease-in-out ${
              page === lastPage ? 'text-gray-300' : 'hover:bg-primary_hover'
            }`}
            onClick={() => handleChange('page', lastPage)}
            disabled={page === lastPage}
          >
            <ArrowRightToLine size={20} />
          </button>
        </>
      )}
    </div>
  )
}
