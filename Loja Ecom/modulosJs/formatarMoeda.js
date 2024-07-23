export default function formatarMoeda(formatarMoeda){

  return new Intl.NumberFormat("en-IN",{style:"currency",currency:"USD"}).format(formatarMoeda)

}