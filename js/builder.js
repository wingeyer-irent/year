const blankSpace = '&nbsp;';
const divElement = '<div></div>';

function createDiv(argClass) {
                return $(divElement).addClass(argClass);
            }

            function createYear(argYear) {
                var monthsContainer = createDiv('months');
                var workingYear = createDiv('year').append(createDiv('header').append(argYear));
                for (month = 0; month < 12; month++) {
                    monthsContainer.append(createMonth(argYear, month));
                }
                workingYear.append(monthsContainer);
                return workingYear;
            }

            function createMonth(argYear, argMonth) {
                var monthDate = moment(`${argYear}-${argMonth + 1}-01`);
                var workingMonthHeader = createDiv('header');
                workingMonthHeader
                    .append(monthDate.format('MMMM'))
                    .attr('data-month', argMonth + 1)
                    .on('click', function (argEventData) {
                        select($(`div.day[data-month="${$(this).attr('data-month')}"]`), argEventData);
                    });
                var workingMonth = createDiv('month').append(workingMonthHeader);

                //agregar fila de nombres de dias de la semana
                var weekDaysHeader = createWeekHeadersRow();
                const dayNames = moment.localeData()._weekdaysMin;
                const firstDay = moment.localeData()._config.week.dow;
                var weekDay = 0;
                weekDaysHeader.append(createEmptyWeekHeaderDay());
                weekDaysHeader.append(createWeekHeaderDay(firstDay, argMonth + 1));
                for (weekDay = firstDay + 1; weekDay !== firstDay; weekDay = (weekDay + 1) % 7) {
                    weekDaysHeader.append(createWeekHeaderDay(weekDay, argMonth + 1));
                }
                workingMonth.append(weekDaysHeader);

                //agregar dias al mes
                while (monthDate.month() == argMonth) {
                    weekDay = 0;
                    var weekDaysRowHeader = createDiv('header day');
                    weekDaysRowHeader
                        .append(monthDate.isoWeek())
                        .attr('data-week', monthDate.isoWeek())
                        .on('click', function (argEventData) {
                            select($(`div.day[data-month="${argMonth+1}"][data-week="${$(this).attr('data-week')}"]`), argEventData);
                        });
                    var weekDaysRow = createWeekDaysRow().append(weekDaysRowHeader);
                    weekDaysRow.append(createDiv());
                    while (weekDay < 7 && monthDate.month() == argMonth) {
                        while (monthDate.weekday() != weekDay) {
                            weekDaysRow.append(createEmptyDay());
                            weekDay++;
                        }
                        weekDaysRow.append(createDay(monthDate));
                        weekDay++;
                        monthDate.add(1, 'd');
                    }
                    while (weekDay < 7) {
                        weekDaysRow.append(createEmptyDay());
                        weekDay++;
                    }
                    workingMonth.append(weekDaysRow);
                }
                return workingMonth;
            }
            function createWeekHeadersRow() {
                return createDiv('week headers');
            }
            function createWeekDaysRow() {
                return createDiv('week days');
            }
            function createWeekHeaderDay(argWeekDay, argMonth) {
                var weekDayElement = createDiv('header day');
                weekDayElement
                    .append(moment.localeData()._weekdaysMin[argWeekDay])
                    .attr('data-weekday', argWeekDay)
                    .attr('data-month', argMonth)
                    .on('click', function (argEventData) {
                        select($(`div.day[data-weekday="${$(this).attr('data-weekday')}"][data-month="${$(this).attr('data-month')}"]`), argEventData);
                    });

                return weekDayElement;
            }
            function createEmptyWeekHeaderDay() {
                return createDiv('header day').append(blankSpace);
            }
            function createDay(argDate) {
                var dayElement = createDiv('day');
                dayElement
                    .attr('id', 'dias')
                    .attr('data-day', argDate.date())
                    .attr('data-month', argDate.month() + 1)
                    .attr('data-year', argDate.year())
                    .attr('data-week', argDate.isoWeek())
                    .attr('data-weekday', argDate.day())
                    .attr('data-dayofyear', argDate.dayOfYear())
                    .attr('data-bandera', 'false');
                dayElement
                    .append(createDayTitle(argDate))
                    .on('click', function (argEventData) {
                        select($(`div.day[data-dayofyear="${$(this).attr('data-dayofyear')}"]`), argEventData);
                    });
                return dayElement;
            }
            function createDayTitle(argDate) {
                return createDiv('title').append(argDate.format('D'));
            }
            function createEmptyDay() {
                return createDiv('day disabled').append(createDiv('title')).append(createDiv('content'));
            }