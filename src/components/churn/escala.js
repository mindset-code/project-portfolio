/** Techo del eje Y de los gráficos de tasa de bajas.
 *
 *  Estaba fijado a mano en cada gráfico —0,6 · 0,9 · 0,7— y esos números
 *  estaban calibrados para un dataset que decía tener un 40 % de bajas. El
 *  dataset real tiene un 13,1 %, así que con las constantes puestas todas las
 *  barras quedaban aplastadas en el cuarto inferior del gráfico.
 *
 *  El techo sale ahora del dato: se redondea al 5 % siguiente y se deja un
 *  20 % de aire para la etiqueta que va encima de cada barra. Así el gráfico
 *  se lee igual de bien tanto si la tasa máxima es del 5 % como del 80 %.
 */
export const techoDelDato = (max) => Math.min(1, Math.ceil(max * 1.2 * 20) / 20)
