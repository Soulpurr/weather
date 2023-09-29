import React from 'react'

function Cards({weatherFields,convertTemperature}) {
  return (
    <div className="grid grid-cols-3 w-full  justify-center">
            {weatherFields.map((field, index) => (
              <div
                key={index}
                className="flex flex-col border border-solid w-[100%] h-[12rem] p-8 bg-[#798bea] rounded-2xl font-serif"
              >
                <p>{field.name?.toUpperCase()}</p>
                <p className="text-xl">
                  {field.name === "Temperature" ||
                  field.name === "Min Temperature" ||
                  field.name === "Max Temperature"
                    ? convertTemperature(field.value)
                    : `${field.value} ${field.unit}`}
                </p>
                <p>{field.extra?.toString()?.toUpperCase()}</p>
              </div>
            ))}
          </div>
  )
}

export default Cards