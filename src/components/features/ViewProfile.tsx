import React from 'react'

type ViewProfilePropsType = {
  items: any
}

const ViewProfile: React.FC<ViewProfilePropsType> = ({ items }) => {
  return (
    <>
      {items.map((el) => (
        <div key={el.title} className="bg-background rounded-[5] pb-[40] mb-[60] overflow-hidden border border-border">
          <h3 className="bg-primary text-popover px-[40] py-[20] text-xl font-semibold">{el.title}</h3>
          <div className="px-[40] py-[30]">
            {el.items.map((el) => (
              <div key={el.name} className="flex py-[20] border-b border-dashed">
                <p className="w-[40%]">{el.name}</p>
                <p className="w-[60%] text-right font-semibold">{el.value}</p>
              </div>
            ))}

            {el.title === 'Адрес доставки' && (
              <div className="pt-[40]">
                <iframe
                  width="100%"
                  height="350"
                  loading="lazy"
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d5103.117736506616!2d28.6413947!3d50.2441456!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x472c648aed44e5cf%3A0x8c8080cc023799b!2z0JbQuNGC0L7QvNC40YDRgdGM0LrQuNC5INCx0LDQt9C-0LLQuNC5INGE0LDRgNC80LDRhtC10LLRgtC40YfQvdC40Lkg0YTQsNGF0L7QstC40Lkg0LrQvtC70LXQtNC2INCW0LjRgtC-0LzQuNGA0YHRjNC60L7RlyDQvtCx0LvQsNGB0L3QvtGXINGA0LDQtNC4!5e0!3m2!1sru!2sua!4v1738593781835!5m2!1sru!2sua"
                ></iframe>
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  )
}
export default ViewProfile
