import React from "react";

function EnrolledEvents() {
  return (
    <Dashboard>
      <div className="flex-1 relative overflow-y-auto">
        {message && <Toast message={message} state={setMessage} />}

        {events?.length > 0 ? (
          <div className="w-full h-full flex flex-col">
            {/* Navbar */}
            <nav className="w-full flex justify-between items-center px-6 py-3">
              <h1 className="text-white font-medium text-xl">Events</h1>

              {/* Filter & Menu Buttons */}
              <div className="flex gap-2 relative">
                <OptionButtons
                  active={category ? true : false}
                  callback={toggleCategoryFilter}
                  Icon={MdCategory}
                />
                <OptionButtons
                  active={date ? true : false}
                  callback={() =>
                    date
                      ? dispatch(setDate(""))
                      : dateInputRef?.current.showPicker()
                  }
                  Icon={FaCalendar}
                />
                <OptionButtons
                  active={dashboardToggle ? true : false}
                  callback={() => setDashboardToggle((prev) => !prev)}
                  Icon={IoIosMenu}
                  styles="md:hidden"
                />

                {fltCategoryToggle && (
                  <FilterCategory openState={setFltCategoryToggle} />
                )}

                <input
                  ref={dateInputRef}
                  type="date"
                  className="hidden"
                  value={date}
                  onChange={(e) => dispatch(setDate(e.target.value))}
                />
              </div>
            </nav>

            {/* Event List */}
            <Eventlist />
          </div>
        ) : (
          <div className="w-full h-full flex justify-center items-center text-white/70">
            No events available
          </div>
        )}
      </div>
    </Dashboard>
  );
}

export default EnrolledEvents;
