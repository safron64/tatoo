const renderCalcBlock = (name, price, time) => {
  const isAdditionalSelector = price[3] ? `<li id="3" class="selector">от 25 см</li>` : ``;
  const isMobile = window.screen.width < 768;
  return `
    <p class="h2">${name}</p>
    <p class="mt-13">
      Не стоит полностью полагаться на разработанную шкалу и отказываться от желания сделать тату только потому, 
      что выбранный участок считается максимально чувствительным. 
    </p>
    <p class="mt-13">
      Во-первых, все индивидуально: вместо болезненных спазмов вы можете почувствовать лишь незначительные 
      мурашки.
    </p>
    <p class="mt-13">
      Во-вторых, боли можно избежать при помощи обезболов.
    </p>
    <div class="calculator">
      <div class="calculator__calc">
        <div class="calculator__calc-header">
          <div>
            <p class="h3">Выбери размер тату:</p>
            <ul class="selectors">
              <li id="0" class="selector active">До 10 см</li>
              <li id="1" class="selector">10-17 см</li>
              <li id="2" class="selector">18-25 см</li>
              ${isAdditionalSelector}
            </ul>
          </div>
        </div>
      </div>
    <div class="calculator__price">
      <p class="h3">от ${price[0]} рублей</p>
    </div>
    <div class="calculator__time">
      <p class="h3">${time[0]}</p>
    </div>
  </div>
  <p class="mt-18">
    Бесплатный идивидуальный эскиз перед сеансом
  </p>
  <p class="mb-15">
    Заживление пленкой
  </p>
  ${isMobile
  ? `<div class="text-center">
      <a class="link text-center link__decoration_checkIn" href="https://wa.me/+79600330101" target="_blank">Записаться на сеанс</a>
    </div>`
  : '<a class="link text-center link__decoration_checkIn" href="https://wa.me/+79600330101" target="_blank">Записаться на сеанс</a>'
  }`
};