import BookCorner, { IBookCornerProps } from "components/BookCorner"
import { createContext, PropsWithChildren, useState } from "react"

const defaultBookContext: IBookCornerProps = {
  squareColor: 'red',
  bgColor: {
    start: 'green',
    end: 'blue',
  },
}
export const BookContext = createContext({ value: defaultBookContext, setValue: (() => null) as Function })

const BookLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const [bookContext, setBookContext] = useState(defaultBookContext)
  
    console.log({ bookContext })

  return (<>
    <BookContext.Provider value={{ value: bookContext, setValue: setBookContext }}>
      { children }
    </BookContext.Provider>
    <BookCorner bgColor={bookContext.bgColor} squareColor={bookContext.squareColor} />
  </>)
}

export default BookLayout